# AI Engineering: From Scratch

## Linear Algebra: Matrix Transformations

A matrix $\mathbf{W} \in \mathbb{R}^{m \times n}$ defines a linear mapping from an $n$-dimensional space to an $m$-dimensional space. Multiplying an input vector $\mathbf{x}$ by a weight matrix $\mathbf{W}$ physically transforms the vector's coordinates into a new representational space.

```python
import numpy as np

# A projection matrix mapping 3D space down to 2D
W = np.array([
    [0.5, 0.1, -0.2],
    [0.1, 0.9,  0.4]
])
x = np.array([1.0, 0.5, -0.3])

# Transform the state via matrix multiplication
h = W @ x 
# Result: [0.61, 0.43]
```

### Rank and Subspace Adaptation

The rank of a matrix is the number of linearly independent columns it contains, representing the true dimensionality of the transformation. 

If a $4096 \times 4096$ weight matrix has rank 16, it only transforms data within a 16-dimensional subspace. This algebraic property is the absolute foundation of Low-Rank Adaptation (LoRA), which factors updates $\Delta \mathbf{W} = \mathbf{A}_{4096 \times 16} \times \mathbf{B}_{16 \times 4096}$ to reduce memory footprint.

<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="10" width="80" height="80" fill="#e2e8f0" stroke="black"/>
  <text x="90" y="55" font-family="sans-serif" text-anchor="middle">ΔW</text>
  <text x="150" y="55" font-family="sans-serif" text-anchor="middle">=</text>
  <rect x="180" y="10" width="20" height="80" fill="#bfdbfe" stroke="black"/>
  <text x="190" y="55" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="220" y="55" font-family="sans-serif" text-anchor="middle">×</text>
  <rect x="240" y="40" width="80" height="20" fill="#bfdbfe" stroke="black"/>
  <text x="280" y="55" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="150" y="110" font-family="monospace" font-size="12">16M params => 131K params</text>
</svg>
