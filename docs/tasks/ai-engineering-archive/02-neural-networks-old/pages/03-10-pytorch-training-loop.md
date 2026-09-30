## The nn.Module abstraction — PyTorch's core pattern

- PyTorch operates in **eager mode** — `y = model(x)` computes immediately, not "add this to a graph". Standard Python tools work: `print()`, `pdb`, `if/else` in `forward()`. This is why PyTorch won 75%+ of ML research paper share by 2022 over TensorFlow's static-graph approach
- Every layer inherits `nn.Module`. A Module has three jobs: `forward()` computes the output, `parameters()` yields all trainable tensors, and `training` flag toggles train/eval behaviour
- **`nn.Sequential`** chains modules: forward feeds data through each in order; `parameters()` collects all sub-module parameters. A Sequential is itself a Module — the composite pattern applied to deep learning

### The canonical PyTorch training loop

:::mint
```python
model = nn.Sequential(nn.Linear(784, 256), nn.ReLU(), nn.Linear(256, 10))
opt   = torch.optim.AdamW(model.parameters(), lr=3e-4)
for x, y in dataloader:
    opt.zero_grad()            # ① clear old gradients
    loss = criterion(model(x), y)  # ② forward + loss
    loss.backward()            # ③ compute all gradients
    opt.step()                 # ④ update weights
    scheduler.step()           # ⑤ adjust learning rate
```
:::

### `zero_grad()`, `backward()`, `step()` — why all three exist

<svg viewBox="0 0 460 72" role="img" aria-label="Training loop state machine: zero_grad clears gradient accumulation, backward fills gradient buffers, step applies gradient to weights, then repeat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="16" width="96" height="40" rx="3" fill="none" stroke="#c04040"/>
  <text x="52" y="32" text-anchor="middle" fill="#c04040">zero_grad()</text>
  <text x="52" y="48" text-anchor="middle" fill="#6b6b6b">clear grad buffers</text>
  <path d="M100 36 L124 36" stroke="#1a1a1a" fill="none" marker-end="url(#a3)"/>
  <rect x="124" y="16" width="96" height="40" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="172" y="32" text-anchor="middle">forward + loss</text>
  <text x="172" y="48" text-anchor="middle" fill="#6b6b6b">build comp. graph</text>
  <path d="M220 36 L244 36" stroke="#1a1a1a" fill="none" marker-end="url(#a3)"/>
  <rect x="244" y="16" width="96" height="40" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="292" y="32" text-anchor="middle">backward()</text>
  <text x="292" y="48" text-anchor="middle" fill="#6b6b6b">fill .grad fields</text>
  <path d="M340 36 L364 36" stroke="#1a1a1a" fill="none" marker-end="url(#a3)"/>
  <rect x="364" y="16" width="92" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="410" y="32" text-anchor="middle" fill="#24405e">step()</text>
  <text x="410" y="48" text-anchor="middle" fill="#6b6b6b">update weights</text>
  <defs><marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

Gradients accumulate by default (`grad += new_grad`). This enables gradient accumulation across multiple batches to simulate a larger effective batch. `zero_grad()` resets this. Omitting it doubles — then triples — the effective gradient each step, diverging the loss.

:::warn
**Missing `model.eval()` before inference.** Dropout and BatchNorm behave differently in training vs evaluation mode. In train mode: dropout zeros random neurons (different output each call); BatchNorm uses mini-batch statistics (unstable on batch size 1). Always call `model.eval()` before inference. Always call `model.train()` before resuming training. Wrapping inference in `torch.no_grad()` also avoids building a computation graph (saves memory and time).
:::
