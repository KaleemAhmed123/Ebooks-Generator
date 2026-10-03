## A training loop from scratch

- Every deep-learning framework hides the same five-step loop. Seeing it once, in plain code, demystifies all of them.
- One pass over the whole dataset is an **epoch**. You run many epochs, each made of many batches.

<svg viewBox="0 0 360 96" role="img" aria-label="The training loop cycle: forward, loss, backward, step, repeat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="8" y="38" width="58" height="22" rx="3"/><rect x="86" y="38" width="58" height="22" rx="3"/><rect x="164" y="38" width="66" height="22" rx="3"/><rect x="250" y="38" width="58" height="22" rx="3"/></g>
  <text x="37" y="53" text-anchor="middle">forward</text><text x="115" y="53" text-anchor="middle">loss</text><text x="197" y="53" text-anchor="middle">backward</text><text x="279" y="53" text-anchor="middle">step</text>
  <g stroke="#1a1a1a"><path d="M66 49 L84 49" marker-end="url(#l)"/><path d="M144 49 L162 49" marker-end="url(#l)"/><path d="M230 49 L248 49" marker-end="url(#l)"/></g>
  <path d="M308 60 C340 80 40 80 37 62" stroke="#6b6b6b" fill="none" marker-end="url(#l)"/>
  <text x="180" y="90" text-anchor="middle" fill="#6b6b6b">repeat for every batch, every epoch</text>
  <defs><marker id="l" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
for epoch in range(epochs):
    for x, y in loader:              # one batch at a time
        opt.zero_grad()             # 1. clear old gradients
        pred = model(x)             # 2. forward pass
        loss = loss_fn(pred, y)     # 3. how wrong?
        loss.backward()             # 4. backprop the gradients
        opt.step()                  # 5. update the weights
```
:::

### Worked example — watching the loop learn

Same tiny network from the backprop page: input = 2, target = 1, one hidden
ReLU neuron, MSE loss, learning rate 0.1. Starting weights: w1 = 0.5, w2 = −1.

| step | w1 | w2 | pred | loss | w1 grad | w2 grad |
|---|---|---|---|---|---|---|
| 0 | 0.50 | −1.00 | −1.00 | 4.00 | 8.0 | −4.0 |
| 1 | 0.50 − 0.1×8 = **−0.30** | −1 − 0.1×(−4) = **−0.60** | — | — | — | — |
| 1 (fwd) | −0.30 | −0.60 | ReLU(2×−0.3)×−0.6 = 0×−0.6 = **0.00** | 1.00 | 0.0 | 0.0 |
| 2 | −0.30 | −0.60 | 0.00 | 1.00 | 0.0 | 0.0 |

- **Step 0 → 1:** the gradients are large, so both weights jump. Loss drops from **4.0** to **1.0**.
- **Step 1 → 2:** the hidden neuron hits zero (ReLU kills negative inputs), so the gradient is zero and the weights freeze. The network is stuck — a **dead ReLU** (page 03-06).
- This is why initialization and activation choice matter. With better starting weights or a Leaky ReLU, the network keeps improving.

:::mint
```python
import torch

x  = torch.tensor([[2.0]])
y  = torch.tensor([[1.0]])
w1 = torch.tensor([[0.5]], requires_grad=True)
w2 = torch.tensor([[-1.0]], requires_grad=True)
lr = 0.1

for step in range(3):
    h    = torch.relu(x @ w1)
    pred = h @ w2
    loss = ((pred - y) ** 2).mean()
    print(f"step {step}  w1={w1.item():.2f}  w2={w2.item():.2f}"
          f"  pred={pred.item():.2f}  loss={loss.item():.2f}")
    loss.backward()
    with torch.no_grad():
        w1 -= lr * w1.grad
        w2 -= lr * w2.grad
    w1.grad.zero_()
    w2.grad.zero_()
# step 0  w1=0.50  w2=-1.00  pred=-1.00  loss=4.00
# step 1  w1=-0.30  w2=-0.60  pred=0.00  loss=1.00
# step 2  w1=-0.30  w2=-0.60  pred=0.00  loss=1.00
```
:::

:::note
That is the entire engine of deep learning. Whisper, ResNet, and GPT are all trained by this exact loop — only the model, the data, and the scale change. Learn these five lines and the rest is detail.
:::
