### The PyTorch autograd contract

:::mint
```python
import torch
x = torch.tensor([2.0], requires_grad=True)
y = x ** 3 + 2 * x             # builds the computation graph
y.backward()                   # reverse-mode pass: dL/dx = 3x² + 2
print(x.grad)                  # tensor([14.])  (exact)
```
:::

`requires_grad=True` tells PyTorch to record every operation on this tensor. `.backward()` triggers the reverse pass, populating `.grad` on all leaf tensors.

### Gradient checking

Numerical gradient (finite difference): `(f(x+h) − f(x−h)) / 2h` for small `h ≈ 1e-5`. Compare against autodiff result. If they match to 5+ significant figures, the backward pass is correct. A mismatch means a bug in the backward logic.

:::warn
Calling `.backward()` accumulates gradients — it adds to `.grad` rather than replacing it. Always call `optimizer.zero_grad()` before each backward pass. If you forget, gradients from previous batches corrupt the current update. This is one of the most common bugs in PyTorch training loops.
:::
