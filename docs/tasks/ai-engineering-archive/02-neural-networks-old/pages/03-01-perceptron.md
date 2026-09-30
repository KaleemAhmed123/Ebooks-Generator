# Module 3 — Neural Networks

## The perceptron — the atom of deep learning

- A **perceptron** takes n inputs, multiplies each by a weight, adds a bias, and passes the result through an activation function: `ŷ = step(w·x + b)`. One computation. One binary decision
- **Weights** encode feature importance; **bias** shifts the decision boundary. Both are learned from data, not set by hand
- A perceptron is a linear classifier — it draws a hyperplane through the input space. Points on one side get class 0; points on the other get class 1

### The learning rule

<svg viewBox="0 0 460 80" role="img" aria-label="Perceptron geometry: inputs x1 x2 multiplied by weights w1 w2, summed with bias, passed through step function, producing 0 or 1 output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <circle cx="40" cy="30" r="10" fill="none" stroke="#1a1a1a"/>
  <text x="40" y="34" text-anchor="middle">x₁</text>
  <circle cx="40" cy="60" r="10" fill="none" stroke="#1a1a1a"/>
  <text x="40" y="64" text-anchor="middle">x₂</text>
  <path d="M50 30 L150 44" stroke="#1a1a1a" fill="none"/>
  <path d="M50 60 L150 48" stroke="#1a1a1a" fill="none"/>
  <text x="94" y="30" font-size="8" fill="#6b6b6b">w₁</text>
  <text x="94" y="60" font-size="8" fill="#6b6b6b">w₂</text>
  <circle cx="168" cy="46" r="18" fill="#e8f4fd" stroke="#24405e" stroke-width="1.5"/>
  <text x="168" y="43" text-anchor="middle" font-size="8">Σw·x</text>
  <text x="168" y="54" text-anchor="middle" font-size="8">+b</text>
  <path d="M186 46 L240 46" stroke="#1a1a1a" fill="none" marker-end="url(#arr)"/>
  <rect x="240" y="34" width="70" height="24" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="275" y="50" text-anchor="middle">step(z)</text>
  <path d="M310 46 L370 46" stroke="#1a1a1a" fill="none" marker-end="url(#arr)"/>
  <circle cx="390" cy="46" r="18" fill="#1a3a2a" stroke="#1a3a2a"/>
  <text x="390" y="50" text-anchor="middle" fill="#fff" font-size="8">0 or 1</text>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
# Perceptron learning rule — Rosenblatt 1958
for x, y_true in zip(X, y):
    y_pred = int((w @ x + b) >= 0)
    err = y_true - y_pred
    w += lr * err * x    # move boundary toward correct examples
    b += lr * err
```
:::

### The XOR problem — why one perceptron is not enough

| (x₁, x₂) | AND | OR | **XOR** |
|---|---|---|---|
| (0, 0) | 0 | 0 | **0** |
| (0, 1) | 0 | 1 | **1** |
| (1, 0) | 0 | 1 | **1** |
| (1, 1) | 1 | 1 | **0** |

AND and OR are linearly separable — one line divides them. XOR is not. The `[0,1]` and `[1,0]` points (output 1) cannot be separated from `[0,0]` and `[1,1]` (output 0) by any single straight line. Minsky and Papert proved this in 1969. The fix: add a hidden layer.

:::note
The perceptron converges in finite steps only if the data is linearly separable (Rosenblatt's convergence theorem). On non-separable data it oscillates forever, never settling. The learning rule carries no concept of "how wrong" — it only checks right or wrong. This is why we need gradient-based learning with a continuous loss.
:::
