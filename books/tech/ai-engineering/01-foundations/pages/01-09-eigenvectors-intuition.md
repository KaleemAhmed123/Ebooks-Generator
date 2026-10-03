## Eigenvectors: the directions a matrix leaves alone

:::note
**Optional deep-dive — safe to skip on a first read.** Come back when a later page (PCA, compression) puts it to use.
:::

- Apply a matrix to most vectors and they swing to a new direction.
- A few special vectors don't turn — they only get longer or shorter. These are the matrix's **eigenvectors**.
- The factor each one is stretched by is its **eigenvalue**. An eigenvalue of 2 means "this direction gets doubled."

<svg viewBox="0 0 460 120" role="img" aria-label="Under a transformation, a generic vector rotates while an eigenvector stays on its own line, only lengthening" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <g transform="translate(110,62)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#eee"/><line x1="0" y1="-52" x2="0" y2="52" stroke="#eee"/>
    <line x1="0" y1="0" x2="55" y2="-30" stroke="#999" stroke-width="2" marker-end="url(#e)"/>
    <line x1="0" y1="0" x2="20" y2="-52" stroke="#c0392b" stroke-width="2" marker-end="url(#e)"/>
    <text x="0" y="72" text-anchor="middle" font-weight="bold">generic vector</text>
    <text x="0" y="84" text-anchor="middle" fill="#c0392b">turns direction</text>
  </g>
  <g transform="translate(350,62)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#eee"/><line x1="0" y1="-52" x2="0" y2="52" stroke="#eee"/>
    <line x1="0" y1="0" x2="40" y2="-20" stroke="#24405e" stroke-width="2" marker-end="url(#e)"/>
    <line x1="0" y1="0" x2="80" y2="-40" stroke="#1a3a2a" stroke-width="2" marker-end="url(#e)"/>
    <text x="0" y="72" text-anchor="middle" font-weight="bold">eigenvector</text>
    <text x="0" y="84" text-anchor="middle" fill="#1a3a2a">same line, longer</text>
  </g>
  <defs><marker id="e" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

### Why an AI engineer meets them

- Eigenvectors expose the **axes a transformation really acts along** — its natural grain.
- **Principal Component Analysis (PCA)**, the standard tool for compressing data, is exactly this: find the eigenvectors of the data's covariance, and the top few point along the directions where the data varies most. Keep those, drop the rest.

:::mint
```python
import numpy as np
A = np.array([[2, 0], [0, 3]])
vals, vecs = np.linalg.eig(A)
vals    # array([2., 3.])  -> the stretch factors along each axis
```
:::
