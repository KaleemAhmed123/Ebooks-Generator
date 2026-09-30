## Matrix multiplication

- Multiplying matrices is not entry-by-entry. Each output entry is a **dot product** of one row from the left and one column from the right.
- The rule for shapes: `(m, n) · (n, p) → (m, p)`. The two inner numbers must match; they cancel.
- `(32, 784) · (784, 128) → (32, 128)`: 32 images, each squeezed from 784 numbers down to 128.

<svg viewBox="0 0 420 96" role="img" aria-label="Shape rule: an m by n matrix times an n by p matrix gives an m by p matrix, inner dimensions must match" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#1a1a1a">
  <rect x="20" y="34" width="70" height="28" fill="#e8f4fd" stroke="#24405e"/>
  <text x="55" y="52" text-anchor="middle">(m, n)</text>
  <rect x="120" y="34" width="70" height="28" fill="#eafaf0" stroke="#1a3a2a"/>
  <text x="155" y="52" text-anchor="middle">(n, p)</text>
  <text x="215" y="52" font-size="14">→</text>
  <rect x="245" y="34" width="70" height="28" fill="#1a3a2a" stroke="#1a3a2a"/>
  <text x="280" y="52" text-anchor="middle" fill="#fff">(m, p)</text>
  <path d="M83 68 Q122 92 150 68" stroke="#c0392b" fill="none"/>
  <text x="118" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#c0392b">these must match</text>
</svg>

### Why this is the whole game

- One matrix multiply transforms an **entire batch** of vectors in a single operation — this is exactly what one layer of a neural network does.
- GPUs are built to do this one operation at enormous scale. When people say a model has "175 billion parameters," those parameters are the numbers inside matrices like these.

:::mint
```python
import numpy as np
X = np.random.rand(32, 784)   # 32 images, 784 pixels each
W = np.random.rand(784, 128)  # a layer's weights
(X @ W).shape                 # (32, 128)  -> 32 images, now 128 features
```
:::

:::warn
Order matters: `A @ B` is not `B @ A`, and usually one of them is a shape error. A mismatched inner dimension (`ValueError: matmul: ... size mismatch`) is the single most common bug in early deep-learning code. Read the shapes before you read the logic.
:::
