## Matrices as functions, eigenvectors, and PCA

- A matrix is a **linear function** — it maps every point in the input space to a point in the output space. Apply it to all points simultaneously and you see how it reshapes space
- **Eigenvector** — a vector that a matrix stretches or compresses but does not rotate. Applying matrix A to eigenvector v gives `Av = λv`, where λ is the **eigenvalue** (the stretch factor)
- Eigenvectors define the natural axes of a transformation. They are the directions that survive the matrix without changing orientation

### What a matrix does to space

<svg viewBox="0 0 460 108" role="img" aria-label="Three transformations: rotation preserves lengths, scaling stretches axes, projection collapses one dimension" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="74" y="14" text-anchor="middle" font-weight="bold">Rotation</text>
  <circle cx="74" cy="60" r="36" fill="none" stroke="#e0e0e0"/>
  <line x1="74" y1="60" x2="106" y2="60" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#ar)"/>
  <line x1="74" y1="60" x2="101" y2="37" stroke="#24405e" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ab)"/>
  <text x="74" y="105" text-anchor="middle" fill="#6b6b6b">lengths preserved</text>
  <text x="230" y="14" text-anchor="middle" font-weight="bold">Scaling</text>
  <line x1="198" y1="60" x2="262" y2="60" stroke="#24405e" stroke-width="2" marker-end="url(#ab)"/>
  <line x1="230" y1="88" x2="230" y2="32" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#ar)"/>
  <text x="230" y="105" text-anchor="middle" fill="#6b6b6b">axes stretched</text>
  <text x="386" y="14" text-anchor="middle" font-weight="bold">Projection</text>
  <line x1="354" y1="60" x2="418" y2="60" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#ar)"/>
  <line x1="386" y1="40" x2="386" y2="60" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <circle cx="386" cy="60" r="3" fill="#24405e"/>
  <text x="386" y="105" text-anchor="middle" fill="#6b6b6b">one dim collapsed</text>
  <defs>
    <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker>
    <marker id="ab" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker>
  </defs>
</svg>

### PCA as eigendecomposition

**PCA** (Principal Component Analysis) — a technique that finds the directions of maximum variance in a dataset by computing the eigenvectors of the data's covariance matrix. The eigenvector with the largest eigenvalue captures the most variance; projecting onto the top-k eigenvectors reduces dimensions while keeping the most information.

:::mint
```python
import numpy as np
cov = np.cov(X.T)              # covariance matrix
eigenvalues, eigenvectors = np.linalg.eigh(cov)
# eigenvectors[:,−1] is the direction of maximum variance
```
:::
