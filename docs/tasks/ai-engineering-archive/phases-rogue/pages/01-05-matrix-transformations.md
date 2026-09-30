# AI Engineering: From Scratch

## Matrix Transformations

Matrices are spatial machines. A rotation matrix spins points along a circle; a scaling matrix stretches axes. Every linear manipulation of data is a composition of these primal transformations.

### Spatial Manipulation

When transformations are composed via matrix multiplication, right-to-left order strictly dictates execution. $\mathbf{S} \mathbf{R} \mathbf{x}$ rotates the vector $\mathbf{x}$ first, then scales it. Matrix multiplication is not commutative: rotating then scaling yields a distinctly different geometry than scaling then rotating.

```python
import numpy as np

# A 90-degree rotation matrix
R = np.array([[0, -1], 
              [1,  0]])
# A scaling matrix (2x width, 0.5x height)
S = np.array([[2,  0], 
              [0, 0.5]])

# Scale then Rotate
M_1 = R @ S # Result: [[0, -0.5], [2, 0]]
# Rotate then Scale
M_2 = S @ R # Result: [[0, -2], [0.5, 0]]
```
