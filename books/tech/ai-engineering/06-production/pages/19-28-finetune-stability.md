## Fine-tuning: training stability

- Real training diverges without a handful of stabilisers. Each is one or two lines; together they are the difference between a loss curve that converges and one that goes NaN at step 400.

:::mint
```python
from torch.optim.lr_scheduler import LambdaLR
import math

# 1) LR schedule: linear warmup then cosine decay
def lr_lambda(step, warmup, total):
    if step < warmup: return step / warmup                  # ramp up
    p = (step - warmup) / (total - warmup)
    return 0.5 * (1 + math.cos(math.pi * p))                # decay to 0
sched = LambdaLR(opt, lambda s: lr_lambda(s, warmup=200, total=5000))
# 2) mixed precision (AMP): faster, less memory
scaler = torch.amp.GradScaler()
with torch.amp.autocast("cuda", dtype=torch.bfloat16):
    _, loss = model(x, y)
    loss = loss / accum_steps                               # 3) grad accumulation
scaler.scale(loss).backward()
if (step + 1) % accum_steps == 0:
    scaler.unscale_(opt)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0) # 4) clip
    scaler.step(opt); scaler.update(); opt.zero_grad(); sched.step()
```
:::

- **LR warmup + cosine decay** — ramp the learning rate up slowly (early steps have wild gradients), then anneal it down for a smooth landing. The near-universal schedule for transformers.
- **Gradient accumulation** — sum gradients over `accum_steps` mini-batches before stepping, simulating a large batch that would not fit in memory. Effective batch size = `batch × accum_steps × num_gpus`.
- **Mixed precision (AMP)** — compute in bfloat16/float16 for speed and memory, keeping a float32 master copy for stability. **Gradient clipping** caps the update norm so one bad batch cannot explode.

:::warn
These interact, and the interaction is where bugs hide. Clip *after* unscaling AMP gradients or the threshold is meaningless. Divide the loss by `accum_steps` or your effective LR is silently too high. Step the scheduler per *optimiser* step, not per micro-batch. Each mistake produces a subtly wrong run that still *looks* like it works — which is why fine-tuning is easy to do and hard to do *correctly*.
:::
