## What a GPU is, and why AI needs one

- A **CPU** has a few powerful cores that do tasks one after another, fast. A **GPU** has thousands of small cores that do many simple tasks at the same time.
- Training a neural network is millions of the same operation — matrix multiplies (Module 1) — that do not depend on each other. That is exactly what thousands of parallel cores are built for.

<svg viewBox="0 0 380 88" role="img" aria-label="A CPU with a few large cores beside a GPU with a grid of many small cores" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="70" y="14" text-anchor="middle" font-weight="bold">CPU: few, fast</text>
  <rect x="30" y="22" width="34" height="34" fill="#e8f4fd" stroke="#24405e"/><rect x="72" y="22" width="34" height="34" fill="#e8f4fd" stroke="#24405e"/>
  <text x="300" y="14" text-anchor="middle" font-weight="bold">GPU: many, parallel</text>
  <g fill="#eafaf0" stroke="#1a3a2a">
    <rect x="230" y="22" width="12" height="12"/><rect x="245" y="22" width="12" height="12"/><rect x="260" y="22" width="12" height="12"/><rect x="275" y="22" width="12" height="12"/><rect x="290" y="22" width="12" height="12"/><rect x="305" y="22" width="12" height="12"/><rect x="320" y="22" width="12" height="12"/><rect x="335" y="22" width="12" height="12"/>
    <rect x="230" y="37" width="12" height="12"/><rect x="245" y="37" width="12" height="12"/><rect x="260" y="37" width="12" height="12"/><rect x="275" y="37" width="12" height="12"/><rect x="290" y="37" width="12" height="12"/><rect x="305" y="37" width="12" height="12"/><rect x="320" y="37" width="12" height="12"/><rect x="335" y="37" width="12" height="12"/>
    <rect x="230" y="52" width="12" height="12"/><rect x="245" y="52" width="12" height="12"/><rect x="260" y="52" width="12" height="12"/><rect x="275" y="52" width="12" height="12"/><rect x="290" y="52" width="12" height="12"/><rect x="305" y="52" width="12" height="12"/><rect x="320" y="52" width="12" height="12"/><rect x="335" y="52" width="12" height="12"/>
  </g>
</svg>

### The two numbers that matter

- **VRAM** (the GPU's own memory) decides what *fits*. The model's weights plus the batch must live in VRAM. Too little and training crashes with "out of memory".
- **Throughput** (how fast it computes) decides how *long* training takes.

:::note
This is why NVIDIA dominates AI: its **CUDA** software layer lets frameworks like PyTorch use the GPU's cores. Alternatives exist (AMD's ROCm, Apple's Metal), but CUDA is the default the whole ecosystem is built around, as of 2026.
:::
