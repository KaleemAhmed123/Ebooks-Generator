## GPT from scratch: the training loop

- Everything converges here: batches of `(x, y)`, a forward pass, the cross-entropy loss, backprop, an optimiser step. Runnable and complete.

:::mint
```python
from torch.utils.data import DataLoader

def train(model, dataset, steps=5000, lr=3e-4, bs=32, device="cuda"):
    model.to(device).train()
    opt = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=0.1)
    loader = DataLoader(dataset, batch_size=bs, shuffle=True)
    it = iter(loader)
    for step in range(steps):
        try: x, y = next(it)
        except StopIteration: it = iter(loader); x, y = next(it)
        x, y = x.to(device), y.to(device)

        _, loss = model(x, y)                 # forward + loss
        opt.zero_grad()
        loss.backward()                        # backprop
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)  # stability
        opt.step()                             # update weights

        if step % 500 == 0:
            print(f"step {step}  loss {loss.item():.3f}")
```
:::

- **The four lines that are the whole of deep learning:** `forward → zero_grad → backward → step`. The forward computes the loss, `backward` fills every parameter's `.grad` via autodiff (Booklet 1), `step` nudges each weight down its gradient. Everything else is scaffolding.
- **AdamW** is the default optimiser (Booklet 2): adaptive per-parameter learning rates plus decoupled weight decay. **Gradient clipping** (`clip_grad_norm_`) caps the update size so one bad batch cannot blow up training — the single most common stability fix (Flagship 2 goes deeper).

:::warn
Watch the loss curve, not just the final number. A loss that *plateaus immediately* means the learning rate is too low or the data is broken; one that *diverges to NaN* means it is too high or a batch had bad values — clip harder or lower the LR. A healthy run drops fast then decreases slowly. For a character-level toy on a small corpus, cross-entropy near `ln(vocab)` at the start (pure guessing) falling toward ~1–2 is the sign it is learning. Loss going to NaN is the number-one from-scratch training failure, and it is almost always LR or an unclipped gradient.
:::
