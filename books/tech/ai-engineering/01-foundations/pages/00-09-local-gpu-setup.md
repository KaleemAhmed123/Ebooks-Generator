## Getting a local GPU working

- The chain that must line up: **NVIDIA driver → CUDA → PyTorch**. Each layer must be compatible with the next, and version mismatches are the classic setup failure.
- As of September 2026, current PyTorch is **2.13**, built against **CUDA 13**. You do not install CUDA by hand — the PyTorch wheel bundles the CUDA libraries it needs. You only need a recent enough NVIDIA driver underneath.

### The install and the one check that matters

:::mint
```bash
uv add torch --torch-backend=auto     # fetches the right CUDA build for you

# then verify PyTorch actually sees the GPU:
uv run python -c "import torch; print(torch.cuda.is_available())"
# True
```
:::

- If that prints `True`, you are done. If `False`, the driver is too old or a CPU-only build was installed — fix that before anything else.

:::warn
`torch.cuda.is_available()` returning `False` is the single most common "why won't it train" problem. Ninety percent of the time it is an outdated GPU driver or accidentally installing the CPU-only wheel. Check this line before you debug your model — the model is probably fine.
:::

:::note
No NVIDIA GPU? On a Mac, PyTorch uses Apple's **MPS** backend instead (`torch.backends.mps.is_available()`). It handles small models; for real training, rent an NVIDIA GPU — the next page.
:::
