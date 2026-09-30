## FlashAttention

- Standard attention has a hidden cost that is not in the math: it writes the full `n × n` score matrix to GPU main memory, then reads it back for the softmax. For long sequences that memory traffic — not the arithmetic — is the bottleneck.
- **FlashAttention** (Dao et al., 2022) computes the *exact* same result without ever materializing the full matrix. It is **IO-aware**: it tiles the computation into blocks that fit in the GPU's tiny, fast on-chip memory (SRAM) and streams the softmax through them.

<svg viewBox="0 0 360 70" role="img" aria-label="Standard attention writes a big matrix to slow memory; FlashAttention tiles through fast on-chip memory" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="80" y="12" text-anchor="middle" fill="#c0392b">standard</text>
  <rect x="30" y="20" width="100" height="30" fill="#c0392b" fill-opacity="0.2" stroke="#c0392b"/><text x="80" y="38" text-anchor="middle">full n×n → slow HBM</text>
  <text x="270" y="12" text-anchor="middle" fill="#1a3a2a">FlashAttention</text>
  <g fill="#1a3a2a" fill-opacity="0.25" stroke="#1a3a2a"><rect x="215" y="20" width="24" height="30"/><rect x="243" y="20" width="24" height="30"/><rect x="271" y="20" width="24" height="30"/><rect x="299" y="20" width="24" height="30"/></g>
  <text x="270" y="64" text-anchor="middle">tiles through fast SRAM</text>
</svg>

- Result: same output, big speedup, and memory that grows **linearly** with sequence length instead of quadratically — the practical enabler of long context.

:::note
Versions matter as of September 2026. **FlashAttention-2** is the workhorse on Ampere GPUs (A100). **FlashAttention-3** (2024) targets Hopper (H100/H200) — it uses those chips' asynchronous Tensor Cores and adds **FP8** (8-bit) attention, reaching ~1.5–2× over FA2. It is exact, not an approximation: you lose no accuracy, only wasted memory traffic. It ships inside PyTorch, vLLM, and every serious serving stack — you rarely call it directly, but it is why your model runs fast.
:::
