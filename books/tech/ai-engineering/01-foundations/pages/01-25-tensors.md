## Tensors and broadcasting

- A **tensor** is the generalization of the vector–matrix idea to any number of dimensions.
- Scalar = 0-D, vector = 1-D, matrix = 2-D, and it keeps going. A colour image is a 3-D tensor `(height, width, channels)`; a batch of them is 4-D.
- Every framework — PyTorch, JAX, TensorFlow — is a tensor engine. Data enters as tensors and stays that way.

### Broadcasting: the silent shape-stretcher

- **Broadcasting** lets you combine tensors of different shapes by automatically stretching the smaller one to fit — without copying memory.
- Adding a bias vector `(128,)` to a batch `(32, 128)` works: the vector is applied to all 32 rows.

<svg viewBox="0 0 360 70" role="img" aria-label="A row vector of shape 128 broadcast across all 32 rows of a batch to add elementwise" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11" fill="#1a1a1a">
  <rect x="10" y="14" width="90" height="40" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="38" text-anchor="middle">(32, 128)</text>
  <text x="108" y="38">+</text>
  <rect x="122" y="26" width="90" height="16" fill="#eafaf0" stroke="#1a3a2a"/><text x="167" y="38" text-anchor="middle">(128,)</text>
  <text x="220" y="38">→</text>
  <rect x="240" y="14" width="90" height="40" fill="#1a3a2a"/><text x="285" y="38" text-anchor="middle" fill="#fff">(32, 128)</text>
</svg>

:::warn
Broadcasting is the top source of silent bugs in AI code. A shape `(32, 1)` and a shape `(1, 32)` will broadcast into `(32, 32)` without any error — you wanted 32 numbers and got 1,024, and the model trains on garbage. When results look wrong, print `.shape` before you print values.
:::
