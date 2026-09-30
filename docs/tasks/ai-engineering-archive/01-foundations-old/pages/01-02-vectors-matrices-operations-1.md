## Dot product, matrix multiply, transpose

- **Dot product** `a · b = Σ aᵢbᵢ` — a single number measuring alignment. The result is 0 when vectors are perpendicular, positive when aligned, negative when opposed
- **Matrix multiply** `(m×n) @ (n×p) → (m×p)` — the inner dimensions must match. Each output element is a dot product of a row from the left matrix and a column from the right
- **Transpose** `Aᵀ` — flip rows and columns. A shape `(m×n)` matrix becomes `(n×m)`. Transpose appears in backpropagation: if the forward pass is `W @ x`, the backward pass uses `Wᵀ`

### The shapes of a neural network layer

<svg viewBox="0 0 460 96" role="img" aria-label="Shape flow through a neural network layer: W of shape (128,784) multiplied by x of shape (784,1) produces output of shape (128,1), then bias of shape (128,1) is added" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="32" width="88" height="32" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="48" y="48" text-anchor="middle" font-weight="bold">W</text>
  <text x="48" y="60" text-anchor="middle" fill="#6b6b6b">128 × 784</text>
  <text x="104" y="52" text-anchor="middle" font-size="14">@</text>
  <rect x="120" y="32" width="88" height="32" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="164" y="48" text-anchor="middle" font-weight="bold">x</text>
  <text x="164" y="60" text-anchor="middle" fill="#6b6b6b">784 × 1</text>
  <text x="220" y="52" text-anchor="middle" font-size="14">=</text>
  <rect x="236" y="32" width="88" height="32" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="280" y="48" text-anchor="middle" font-weight="bold">Wx</text>
  <text x="280" y="60" text-anchor="middle" fill="#24405e">128 × 1</text>
  <text x="336" y="52" text-anchor="middle" font-size="14">+</text>
  <rect x="352" y="32" width="60" height="32" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="382" y="48" text-anchor="middle" font-weight="bold">b</text>
  <text x="382" y="60" text-anchor="middle" fill="#6b6b6b">128 × 1</text>
  <text x="70" y="24" text-anchor="middle" font-size="8" fill="#6b6b6b">inner dim: 784 = 784 ✓</text>
</svg>

### Element-wise vs matrix multiply — the critical distinction

:::mint
```python
import numpy as np
A = np.array([[1,2],[3,4]])
B = np.array([[5,6],[7,8]])

A * B        # element-wise: [[5,12],[21,32]]
A @ B        # matrix multiply: [[19,22],[43,50]]
```
:::

The `*` operator multiplies matching positions — shapes must be identical. The `@` operator takes dot products of rows × columns — inner dimensions must match. Confusing the two is the most common shape error in AI code.
