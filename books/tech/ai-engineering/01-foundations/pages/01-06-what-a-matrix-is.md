## What a matrix is

- A **matrix** is a grid of numbers — rows and columns. If a vector is a list, a matrix is a table.
- Its **shape** is `(rows, columns)`. A `(3, 2)` matrix has 3 rows and 2 columns.
- You reach an entry by row then column: `M[1, 0]` is row 1, column 0.

### Two ways to read the same grid, both useful

<svg viewBox="0 0 460 118" role="img" aria-label="A 3 by 2 matrix read as three stacked row-vectors on the left, and as two column-vectors on the right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="70" y="14" text-anchor="middle" font-weight="bold">A stack of examples</text>
  <g font-family="monospace" font-size="10">
    <rect x="30" y="24" width="80" height="18" fill="#e8f4fd" stroke="#24405e"/>
    <text x="70" y="37" text-anchor="middle">[1.0, 0.5]</text>
    <rect x="30" y="44" width="80" height="18" fill="#e8f4fd" stroke="#24405e"/>
    <text x="70" y="57" text-anchor="middle">[0.2, 0.9]</text>
    <rect x="30" y="64" width="80" height="18" fill="#e8f4fd" stroke="#24405e"/>
    <text x="70" y="77" text-anchor="middle">[0.7, 0.1]</text>
  </g>
  <text x="70" y="98" text-anchor="middle" fill="#6b6b6b">each row = one data point</text>
  <text x="330" y="14" text-anchor="middle" font-weight="bold">A set of features</text>
  <g font-family="monospace" font-size="10">
    <rect x="280" y="24" width="40" height="58" fill="#eafaf0" stroke="#1a3a2a"/>
    <rect x="330" y="24" width="40" height="58" fill="#eafaf0" stroke="#1a3a2a"/>
    <text x="300" y="45" text-anchor="middle">1.0</text><text x="300" y="60" text-anchor="middle">0.2</text><text x="300" y="75" text-anchor="middle">0.7</text>
    <text x="350" y="45" text-anchor="middle">0.5</text><text x="350" y="60" text-anchor="middle">0.9</text><text x="350" y="75" text-anchor="middle">0.1</text>
  </g>
  <text x="330" y="98" text-anchor="middle" fill="#6b6b6b">each column = one feature</text>
</svg>

- **As a stack of row-vectors** — one row per example. A batch of 32 images is a matrix of 32 rows.
- **As a set of column-vectors** — one column per feature or per output. This is how a neural network layer's weights are stored.

:::mint
```python
import numpy as np
M = np.array([[1.0, 0.5],
              [0.2, 0.9],
              [0.7, 0.1]])

M.shape    # (3, 2)  -> 3 rows, 2 columns
M[1, 0]    # 0.2     -> row 1, column 0
M[0]       # array([1.0, 0.5])  -> the whole first row
```
:::
