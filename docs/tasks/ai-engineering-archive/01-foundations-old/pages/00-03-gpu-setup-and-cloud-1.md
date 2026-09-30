## GPU setup and cloud options

- **CUDA** — NVIDIA's parallel computing platform. GPU code compiled for CUDA 12.4 does not run on a CUDA 11.8 driver. The driver version (`nvidia-smi`) must be ≥ the PyTorch CUDA version
- **VRAM** — GPU memory, separate from system RAM. Model weights must fit entirely in VRAM during inference. During training, add gradients and optimizer states: a 7B parameter model in fp32 requires ~84 GB VRAM; in fp16, ~14 GB
- **MPS** (Metal Performance Shaders) — Apple's GPU backend for PyTorch on Apple Silicon (M1/M2/M3/M4). No CUDA; different API but same `torch.Tensor` interface

### Cloud GPU options, as of September 2026

<svg viewBox="0 0 460 124" role="img" aria-label="Comparison of GPU options: local NVIDIA, Google Colab, Lambda/RunPod/Vast.ai" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="140" height="108" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="74" y="24" text-anchor="middle" font-weight="bold">Local NVIDIA</text>
  <text x="74" y="40" text-anchor="middle" fill="#6b6b6b">Cost: $0 (own hardware)</text>
  <text x="74" y="56" text-anchor="middle" fill="#6b6b6b">VRAM: 8–24 GB typical</text>
  <text x="74" y="72" text-anchor="middle" fill="#6b6b6b">Latency: none</text>
  <text x="74" y="88" text-anchor="middle" fill="#6b6b6b">Best for: daily iteration</text>
  <rect x="160" y="8" width="140" height="108" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="230" y="24" text-anchor="middle" font-weight="bold">Google Colab</text>
  <text x="230" y="40" text-anchor="middle" fill="#6b6b6b">Cost: free (T4 GPU)</text>
  <text x="230" y="56" text-anchor="middle" fill="#6b6b6b">VRAM: 16 GB (T4)</text>
  <text x="230" y="72" text-anchor="middle" fill="#6b6b6b">Limit: 12 hr sessions</text>
  <text x="230" y="88" text-anchor="middle" fill="#6b6b6b">Best for: quick experiments</text>
  <rect x="316" y="8" width="140" height="108" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="386" y="24" text-anchor="middle" font-weight="bold">Cloud GPU</text>
  <text x="386" y="40" text-anchor="middle" fill="#6b6b6b">Lambda · RunPod · Vast.ai</text>
  <text x="386" y="56" text-anchor="middle" fill="#6b6b6b">Cost: $0.20–$4/hr</text>
  <text x="386" y="72" text-anchor="middle" fill="#6b6b6b">VRAM: up to 80 GB (A100)</text>
  <text x="386" y="88" text-anchor="middle" fill="#6b6b6b">Best for: long training runs</text>
</svg>

### Verify GPU access in PyTorch

:::mint
```python
import torch
device = torch.device("cuda" if torch.cuda.is_available() else
                      "mps"  if torch.backends.mps.is_available() else "cpu")
print(device)  # always runs; picks the fastest available backend
```
:::
