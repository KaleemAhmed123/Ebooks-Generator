### VRAM sizing rule of thumb

| Precision | Bytes per parameter | 7B model | 13B model |
|-----------|--------------------:|:--------:|:---------:|
| fp32      | 4                   | 28 GB    | 52 GB     |
| fp16/bf16 | 2                   | 14 GB    | 26 GB     |
| int8      | 1                   | 7 GB     | 13 GB     |

Training adds gradients (~same size as weights) and optimizer states (Adam: 2× weights). A 7B model trained with Adam in bf16 needs roughly 42 GB VRAM.

:::warn
PyTorch CUDA version must be ≤ your driver's CUDA version. Check with `nvidia-smi` (driver) and `python -c "import torch; print(torch.version.cuda)"` (PyTorch). Mismatch causes cryptic `CUDA error: no kernel image is available` at runtime, not at install time.
:::
