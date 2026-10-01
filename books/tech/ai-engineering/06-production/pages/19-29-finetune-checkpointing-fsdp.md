## Fine-tuning: checkpointing and FSDP

- Long training runs *will* be interrupted (a crash, a preemption, a deploy), so **checkpointing** — save enough state to resume exactly — is mandatory. And a model bigger than one GPU needs **sharding** across GPUs.

:::mint
```python
# checkpoint: model + optimiser + scheduler + step (everything to resume)
def save_ckpt(path, model, opt, sched, step):
    torch.save({"model": model.state_dict(), "opt": opt.state_dict(),
                "sched": sched.state_dict(), "step": step}, path)

def load_ckpt(path, model, opt, sched):
    ck = torch.load(path)
    model.load_state_dict(ck["model"]); opt.load_state_dict(ck["opt"])
    sched.load_state_dict(ck["sched"]); return ck["step"]
```
:::

- **Save the optimiser too, not just the weights.** AdamW carries per-parameter momentum and variance; resume without them and training lurches. A checkpoint that saves only `model.state_dict()` resumes to a visibly worse loss — the classic "why did my loss jump on resume?" bug.

- **Sharding for scale.** Two axes (17-11a). **DDP** (Distributed Data Parallel) replicates the whole model per GPU and syncs gradients — for models that fit one GPU, more throughput. **FSDP** (Fully Sharded Data Parallel) *shards* the model's parameters, gradients, and optimiser state across GPUs — for models too big for one card, the open-source ZeRO-style answer.

:::mint
```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
model = FSDP(model)          # params/grads/optimizer-state sharded across GPUs
# each GPU holds 1/N of the state; layers are gathered just-in-time per forward
```
:::

:::note
The memory math is why FSDP exists: training state is roughly *weights + gradients + optimiser state*, and for AdamW the optimiser state alone is ~2× the weights (momentum + variance) — so a 7B model in FP16 needs ~14 GB weights + ~14 GB grads + ~28 GB optimiser ≈ 56 GB *before activations*. That overflows a 40 GB card. FSDP shards all three across N GPUs so each holds ~1/N, which is what makes training a large model on a cluster possible at all. It is the training-time twin of tensor parallelism at serving time (17-11a).
:::
