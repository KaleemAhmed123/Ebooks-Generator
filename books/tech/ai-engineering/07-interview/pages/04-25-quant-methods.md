## GPTQ, AWQ, GGUF, FP8/INT4 — how do you keep these straight?

- These mix up two different things: **algorithms** (how to quantize) and **formats** (how it's stored/run). [VERIFY: all names/kernels on fact pass.]
- **Algorithms (PTQ):**
  - **GPTQ** — layer-by-layer, minimises output error using second-order (Hessian) info. Strong 4-bit accuracy.
  - **AWQ (activation-aware)** — protects the ~1% of weight channels that matter most (identified via activations), scaling them to avoid quantization error. Fast kernels (e.g. Marlin) on vLLM.
- **Formats / numeric types:**
  - **GGUF** — the llama.cpp file format for CPU/edge; offers presets like `Q4_K_M` (4-bit, ~92% of full quality).
  - **FP8 / INT4** — hardware numeric types; **FP8** on H100/Blackwell keeps a float exponent (good for activations), **INT4** is integer weights for max compression.
- Practical: **vLLM/SGL[VERIFY]** serve AWQ/GPTQ/FP8; **llama.cpp/Ollama** use GGUF for local. Pick by *where you run* and *how low you can go on accuracy*.

:::interview
**What's really being tested:** that you don't treat these as interchangeable — algorithm (GPTQ/AWQ) vs storage format (GGUF) vs numeric type (FP8/INT4), and which ecosystem each lives in.
:::
