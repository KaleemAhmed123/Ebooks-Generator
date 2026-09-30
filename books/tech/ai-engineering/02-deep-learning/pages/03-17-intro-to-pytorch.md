## Intro to PyTorch

- **PyTorch** is the framework most AI research and production runs on (as of September 2026). It gives you three things: tensors on the GPU, automatic differentiation, and a library of ready-made layers.
- A **tensor** is Booklet 1's n-dimensional array, but it can live on a GPU and it records operations for autodiff.
- You build a model by subclassing `nn.Module`: define the layers in `__init__`, define the forward pass in `forward`.

:::mint
```python
import torch, torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))
    def forward(self, x):
        return self.net(x)

model = MLP().to("cuda")     # move all weights to the GPU
```
:::

- `nn.Sequential` chains layers in order. `.to("cuda")` moves the weights to the GPU; every input must live on the same device.

:::warn
The most frequent runtime error is a device mismatch: `Expected all tensors to be on the same device`. It means the model is on the GPU but the batch is still on the CPU (or the reverse). Send both with `.to(device)`.
:::
