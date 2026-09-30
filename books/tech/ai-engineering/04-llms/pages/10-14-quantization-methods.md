## Quantization methods

- Naive rounding loses too much. Real methods spend effort deciding *which* weights to round hard and which to protect. The names you meet on model cards, as of September 2026:

<svg viewBox="0 0 328 78" role="img" aria-label="GPTQ and AWQ target GPU inference, GGUF targets CPU, FP8 is GPU-native, QLoRA is for training" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="8" width="100" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="56" y="21" text-anchor="middle" font-size="8" fill="#24405e">GPTQ / AWQ</text><text x="56" y="32" text-anchor="middle">4-bit, GPU serving</text>
  <rect x="114" y="8" width="100" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="164" y="21" text-anchor="middle" font-size="8" fill="#24405e">GGUF</text><text x="164" y="32" text-anchor="middle">CPU / Ollama, laptops</text>
  <rect x="222" y="8" width="100" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="272" y="21" text-anchor="middle" font-size="8" fill="#24405e">FP8</text><text x="272" y="32" text-anchor="middle">H100+, near-lossless</text>
</svg>

- **GPTQ** — minimises layer-by-layer rounding error using second-order (curvature) information. Mature, huge library of pre-quantized models, GPU-focused.
- **AWQ (Activation-aware Weight Quantization)** — protects the ~1% of weights that activations mark as important, quantizes the rest to 4-bit. Fastest on vLLM (Marlin kernel); a common default.
- **GGUF** — a **file format** (from llama.cpp), not an algorithm; its block-wise schemes like `Q4_K_M` run well on CPU and consumer machines. Retains ~92% quality at 4-bit.
- **FP8** — 8-bit *floating point*, native on H100/Ada GPUs. Better accuracy than INT8 at the same size; the GPU-native serving format going forward.

:::note
**Post-training quantization (PTQ)** — the above — quantizes an already-trained model in minutes with a small calibration set. **Quantization-aware training (QAT)** simulates rounding *during* training for higher quality, at much higher cost. Most deployments use PTQ; AWQ or GGUF-`Q4_K_M` at 4-bit is the common sweet spot.
:::

:::warn
You **cannot fine-tune** pre-quantized GPTQ/AWQ/GGUF weights directly — they are frozen for inference. To train on a quantized base you need QLoRA (next page), which keeps the base 4-bit and trains small add-on adapters instead.
:::
