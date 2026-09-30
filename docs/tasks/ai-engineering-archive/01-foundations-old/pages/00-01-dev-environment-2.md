### Verify GPU availability

:::mint
```python
import torch
print(torch.cuda.is_available())          # True on NVIDIA
print(torch.backends.mps.is_available())  # True on Apple Silicon
```
:::

:::warn
Do not mix `pip install` and `conda install` in the same environment. Conda manages its own dependency graph; pip does not know about it. One pip install into a conda env can silently break all conda packages.
:::

### The `.gitignore` every AI project needs

- `.venv/` — 200 MB–2 GB; not portable between machines
- `*.pt`, `*.pth`, `*.safetensors` — model checkpoints, binary, large
- `*.env` — secrets; never committed
