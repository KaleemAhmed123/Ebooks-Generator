## The dot product: how AI measures similarity

- The **dot product** multiplies two vectors entry by entry, then adds the results into a single number.
- `[1, 2, 3] · [4, 5, 6] = 4 + 10 + 18 = 32`.
- That one number answers a question you will ask on almost every page from here on: *how aligned are these two vectors?*

### The number is really an angle

The dot product hides a geometric fact:

$$ a \cdot b = \|a\|\,\|b\|\,\cos(\theta) $$

- When both vectors are **unit vectors** (length 1), the sizes drop out and the dot product *is* `cos(θ)` — the **cosine similarity**.

<svg viewBox="0 0 460 108" role="img" aria-label="Three cases: same direction cosine 1, perpendicular cosine 0, opposite cosine minus 1" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <g transform="translate(70,60)">
    <line x1="0" y1="0" x2="45" y2="-18" stroke="#24405e" stroke-width="2" marker-end="url(#d)"/>
    <line x1="0" y1="0" x2="47" y2="-12" stroke="#1a3a2a" stroke-width="2" marker-end="url(#d)"/>
    <text x="20" y="30" text-anchor="middle">same way</text>
    <text x="20" y="43" text-anchor="middle" fill="#24405e" font-weight="bold">cos = 1</text>
  </g>
  <g transform="translate(220,60)">
    <line x1="0" y1="0" x2="48" y2="0" stroke="#24405e" stroke-width="2" marker-end="url(#d)"/>
    <line x1="0" y1="0" x2="0" y2="-40" stroke="#1a3a2a" stroke-width="2" marker-end="url(#d)"/>
    <text x="10" y="30" text-anchor="middle">at 90°</text>
    <text x="10" y="43" text-anchor="middle" fill="#24405e" font-weight="bold">cos = 0</text>
  </g>
  <g transform="translate(380,60)">
    <line x1="0" y1="0" x2="45" y2="0" stroke="#24405e" stroke-width="2" marker-end="url(#d)"/>
    <line x1="0" y1="0" x2="-45" y2="0" stroke="#1a3a2a" stroke-width="2" marker-end="url(#d)"/>
    <text x="0" y="30" text-anchor="middle">opposite</text>
    <text x="0" y="43" text-anchor="middle" fill="#24405e" font-weight="bold">cos = -1</text>
  </g>
  <defs><marker id="d" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

- `1` — identical direction, maximally similar. `0` — unrelated. `-1` — opposite meaning.

:::note
Semantic search, recommendation, retrieval-augmented generation, and the attention inside every transformer all reduce to one operation: dot products between vectors. Learn this number and you have the core of modern AI.
:::

:::mint
```python
import numpy as np
a, b = np.array([1, 2, 3]), np.array([4, 5, 6])
a @ b     # 32   -> the @ operator is the dot product
```
:::
