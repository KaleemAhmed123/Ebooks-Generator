### Broadcasting: adding bias without loops

When you add a bias vector `b` of shape `(128,)` to a batch of 32 activations shaped `(32, 128)`, NumPy and PyTorch broadcast `b` across the batch dimension automatically:

:::mint
```python
# (32, 128) + (128,) → broadcasts to (32, 128) + (32, 128)
out = (X @ W.T) + b   # W.T transposes W for the correct shapes
```
:::

:::warn
Shape mismatch errors (`RuntimeError: mat1 and mat2 shapes cannot be multiplied`) almost always mean the wrong transpose. Check that your weight matrix's inner dimension matches the input dimension. Use `tensor.shape` liberally — getting shapes right before training saves hours.
:::
