## Dimensionality reduction — curse, PCA, t-SNE, UMAP

- **Curse of dimensionality** — in high-dimensional spaces, distances between random points converge to the same value. With 1000 features, the ratio of the farthest to the nearest neighbor approaches 1. Nearest-neighbor search, clustering, and density estimation all degrade
- **PCA** (Principal Component Analysis) — rotates the coordinate system to align axes with the directions of maximum variance. The top-k eigenvectors of the covariance matrix span the subspace that retains the most information per dimension
- **t-SNE** — maps high-dimensional points to 2D by preserving neighborhood structure. Non-linear, stochastic, slow (O(n²)), and distances *between* clusters are not interpretable. Use for visualization only, never as input features for a downstream model

### PCA algorithm and when to use each method

<svg viewBox="0 0 460 80" role="img" aria-label="Three reduction methods compared: PCA linear global structure, t-SNE non-linear local clusters, UMAP non-linear both local and global" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="8" width="140" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="74" y="26" text-anchor="middle" font-weight="bold">PCA</text>
  <text x="74" y="40" text-anchor="middle" fill="#6b6b6b">Linear · fast · global</text>
  <text x="74" y="52" text-anchor="middle" fill="#6b6b6b">Distances meaningful</text>
  <text x="74" y="64" text-anchor="middle" fill="#6b6b6b">Use as preprocessing</text>
  <rect x="160" y="8" width="140" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="230" y="26" text-anchor="middle" font-weight="bold">t-SNE</text>
  <text x="230" y="40" text-anchor="middle" fill="#6b6b6b">Non-linear · slow · local</text>
  <text x="230" y="52" text-anchor="middle" fill="#6b6b6b">Clusters only</text>
  <text x="230" y="64" text-anchor="middle" fill="#6b6b6b">Visualization only</text>
  <rect x="316" y="8" width="140" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="386" y="26" text-anchor="middle" font-weight="bold">UMAP</text>
  <text x="386" y="40" text-anchor="middle" fill="#6b6b6b">Non-linear · fast · both</text>
  <text x="386" y="52" text-anchor="middle" fill="#6b6b6b">Better global structure</text>
  <text x="386" y="64" text-anchor="middle" fill="#6b6b6b">Visualization + features</text>
</svg>

### PCA from scratch

:::mint
```python
import numpy as np
X_c = X - X.mean(axis=0)               # 1. center
cov = X_c.T @ X_c / (len(X) - 1)       # 2. covariance matrix
vals, vecs = np.linalg.eigh(cov)        # 3. eigendecompose
top_k = vecs[:, -k:]                   # 4. top-k eigenvectors
X_reduced = X_c @ top_k                # 5. project
```
:::

### Choosing k — explained variance

Plot `np.cumsum(eigenvalues[::-1]) / eigenvalues.sum()`. Pick k where the curve hits 0.95. That k retains 95% of the dataset's variance in far fewer dimensions.

:::warn
Never use t-SNE output as features for downstream models. t-SNE is stochastic and non-parametric — there is no way to project new points into the same 2D space without rerunning it on the full dataset. UMAP has a parametric mode (`parametric_umap`) that can embed new points consistently, making it usable as a feature transform.
:::
