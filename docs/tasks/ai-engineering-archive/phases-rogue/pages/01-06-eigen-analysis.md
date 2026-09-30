# AI Engineering: From Scratch

## Eigen-Analysis

Most vectors have their trajectories aggressively altered by a matrix. Eigenvectors are the rare, stable exceptions: the matrix only scales them, never rotates them. The scale factor is the eigenvalue ($\lambda$).

$$ \mathbf{A} \mathbf{v} = \lambda \mathbf{v} $$

<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <!-- Axes -->
  <line x1="50" y1="100" x2="250" y2="100" stroke="black" stroke-width="1" stroke-dasharray="4"/>
  <line x1="50" y1="100" x2="50" y2="20" stroke="black" stroke-width="1" stroke-dasharray="4"/>
  <!-- Original Vector -->
  <line x1="50" y1="100" x2="130" y2="60" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="110" y="50" font-family="monospace" fill="#3b82f6">v</text>
  <!-- Transformed Vector -->
  <line x1="50" y1="100" x2="210" y2="20" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="215" y="15" font-family="monospace" fill="#ef4444">λv</text>
  <!-- Label -->
  <text x="270" y="60" font-family="sans-serif" font-size="12">Direction preserved.</text>
  <text x="270" y="75" font-family="sans-serif" font-size="12">Magnitude scaled.</text>
</svg>

### Why Spectral Analysis Matters

In **Principal Component Analysis (PCA)**, the eigenvectors of the data's covariance matrix define the principal axes of variance; the eigenvalues dictate how much variance each axis captures. Sorting eigenvectors by eigenvalue is the mathematical engine of linear dimensionality reduction.

In **Recurrent Neural Networks (RNNs)**, if the weight matrix possesses eigenvalues with an absolute magnitude greater than $1$, gradients explode exponentially over time. If they are less than $1$, gradients vanish.
