## Optimizers in practice

- Backprop hands you gradients. The **optimizer** decides how to turn each gradient into an actual weight change.
- Booklet 1 covered the math of SGD, momentum, and Adam. In practice the choice narrows to two habits.
- **AdamW** — Adam with correct weight decay. The default for transformers and most new work. Forgiving of the learning rate.
- **SGD with momentum** — often generalises slightly better on vision models, but needs more tuning to get there.

:::mint
```python
import torch
opt = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)

opt.zero_grad()      # clear last step's gradients
loss.backward()      # backprop fills .grad
opt.step()           # apply the update to every weight
```
:::

- `3e-4` (0.0003) is the folklore starting learning rate for AdamW. It is a good first guess, not a law.

:::warn
Forgetting `opt.zero_grad()` is the most common training bug. PyTorch **accumulates** gradients by default, so without it each step adds the previous step's gradient too — the model lurches and the loss goes haywire. Zero them every step.
:::
