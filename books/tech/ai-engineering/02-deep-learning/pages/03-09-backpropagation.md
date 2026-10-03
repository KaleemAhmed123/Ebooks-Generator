## Backpropagation

- **Backpropagation** works out how much each weight contributed to the loss, so we know which way to nudge it.
- It applies the **chain rule** (Booklet 1) backward through the network: start at the loss, walk to the inputs, multiplying the local slope at every step.
- One backward pass yields *every* weight's gradient at once. This is reverse-mode automatic differentiation (Booklet 1), applied to a loss.

<svg viewBox="0 0 400 100" role="img" aria-label="Forward arrows carry data left to right; backward arrows carry gradients right to left through the same layers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="30" y="40" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="65" y="57" text-anchor="middle">layer 1</text>
  <rect x="165" y="40" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="57" text-anchor="middle">layer 2</text>
  <rect x="300" y="40" width="70" height="26" rx="3" fill="#1a3a2a"/><text x="335" y="57" text-anchor="middle" fill="#fff">loss</text>
  <g stroke="#24405e"><path d="M100 47 L163 47" marker-end="url(#a)"/><path d="M235 47 L298 47" marker-end="url(#a)"/></g>
  <text x="200" y="34" text-anchor="middle" fill="#24405e">forward: data →</text>
  <g stroke="#c0392b"><path d="M298 60 L235 60" marker-end="url(#b)"/><path d="M163 60 L100 60" marker-end="url(#b)"/></g>
  <text x="200" y="82" text-anchor="middle" fill="#c0392b">← backward: gradients</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::mint
```python
loss = cross_entropy(model(x), y)
loss.backward()          # backprop: fills every weight's .grad
layer.weight.grad        # d(loss)/d(weight), ready for the optimizer
```
:::

### Worked example — backprop through the tiniest network

One input neuron, one hidden neuron (ReLU), one output neuron, MSE loss. Small
enough to trace by hand; big enough to show how the chain rule flows backward.

**Setup:**

| symbol | meaning | value |
|---|---|---|
| x | input | 2.0 |
| w1 | input → hidden weight | 0.5 |
| b1 | hidden bias | 0.0 |
| w2 | hidden → output weight | -1.0 |
| b2 | output bias | 0.0 |
| y | true label | 1.0 |

**Forward pass** (left to right):

| step | computation | result |
|---|---|---|
| hidden (pre-activation) | x × w1 + b1 = 2 × 0.5 + 0 | 1.0 |
| hidden (after ReLU) | max(0, 1.0) | **h = 1.0** |
| output | h × w2 + b2 = 1 × (−1) + 0 | **pred = −1.0** |
| MSE loss | (pred − y)² = (−1 − 1)² | **loss = 4.0** |

**Backward pass** (right to left, applying the chain rule at every step):

| step | what we compute | value | meaning |
|---|---|---|---|
| loss → output | d(loss)/d(pred) = 2 × (pred − y) = 2 × (−2) | **−4.0** | the loss wants the output to go *up* |
| output → w2 | d(pred)/d(w2) = h = 1.0, so d(loss)/d(w2) = −4 × 1 | **−4.0** | w2's gradient |
| output → hidden | d(pred)/d(h) = w2 = −1, so d(loss)/d(h) = −4 × (−1) | **4.0** | gradient flowing into hidden layer |
| ReLU gate | h was positive, so ReLU passes the gradient through | **4.0** | (if h had been ≤ 0, gradient = 0 — the neuron is "dead") |
| hidden → w1 | d(h)/d(w1) = x = 2, so d(loss)/d(w1) = 4 × 2 | **8.0** | w1's gradient |

- The gradient for **w2** is **−4.0**: nudge w2 *up* to reduce the loss.
- The gradient for **w1** is **8.0**: nudge w1 *down*.
- Every gradient was one chain-rule multiplication — local slope × incoming gradient — repeated layer by layer. That is all backprop does.

:::mint
```python
import torch
import torch.nn as nn

x  = torch.tensor([[2.0]])
y  = torch.tensor([[1.0]])
w1 = torch.tensor([[0.5]], requires_grad=True)
w2 = torch.tensor([[-1.0]], requires_grad=True)

h    = torch.relu(x @ w1)           # hidden: 1.0
pred = h @ w2                        # output: -1.0
loss = ((pred - y) ** 2).mean()      # MSE: 4.0
loss.backward()

print(w1.grad)  # tensor([[8.]])
print(w2.grad)  # tensor([[-4.]])
```
:::

:::note
Backprop is not the learning — it only *computes* gradients. The optimizer (next pages) uses them to change the weights. Backprop answers one question, cheaply and exactly: which way is downhill for every weight?
:::
