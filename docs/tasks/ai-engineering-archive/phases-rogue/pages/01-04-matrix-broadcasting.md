# AI Engineering: From Scratch

## Dimensional Broadcasting

Broadcasting automatically expands smaller tensors across missing dimensions to match larger ones. When adding a $1 \times n$ bias vector to an $m \times n$ batch matrix, the system implicitly duplicates the vector $m$ times.

```python
import numpy as np

# A batch of 2 inputs, each with 3 features (2x3)
batch_activations = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])
# A single bias vector for the 3 features (1x3)
bias = np.array([10, 10, 10])

# Broadcasting stretches the bias to (2x3) silently
output = batch_activations + bias
# Result: [[11, 12, 13], [14, 15, 16]]
```

### Invertibility and The Determinant

The determinant summarizes the volumetric scaling factor of a square matrix. If $\det(\mathbf{A}) = 0$, the matrix collapses space into a lower dimension, irrecoverably destroying information. Such singular matrices have no inverse ($\mathbf{A}^{-1}$), meaning the transformation cannot be undone algebraically.
