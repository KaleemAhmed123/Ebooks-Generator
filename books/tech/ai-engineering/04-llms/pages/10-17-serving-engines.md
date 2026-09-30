## Serving engines

- You do not hand-roll inference. A **serving engine** wraps a model in a server that batches requests, manages the KV cache, and streams tokens back — turning a checkpoint into an API. The 2026 landscape:

<svg viewBox="0 0 328 74" role="img" aria-label="vLLM and SGLang are the open defaults, TensorRT-LLM is fastest on NVIDIA, TGI is now maintenance mode" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="8" width="100" height="30" rx="3" fill="#24405e"/><text x="56" y="21" text-anchor="middle" font-size="8" fill="#fff">vLLM</text><text x="56" y="32" text-anchor="middle" fill="#ccd">PagedAttention</text>
  <rect x="114" y="8" width="100" height="30" rx="3" fill="#24405e"/><text x="164" y="21" text-anchor="middle" font-size="8" fill="#fff">SGLang</text><text x="164" y="32" text-anchor="middle" fill="#ccd">RadixAttention</text>
  <rect x="222" y="8" width="100" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="272" y="21" text-anchor="middle" font-size="8" fill="#24405e">TensorRT-LLM</text><text x="272" y="32" text-anchor="middle">fastest, NVIDIA-only</text>
</svg>

- **vLLM** — the open default. Its **PagedAttention** stores the KV cache in fixed pages like OS virtual memory, ending the fragmentation that wasted GPU RAM. Continuous batching and fused kernels come built in.
- **SGLang** — newer, built for **shared prefixes**. Its **RadixAttention** caches the KV of common prefixes (a system prompt, a few-shot block, a document header) in a tree so it is computed once and reused — ~29% higher throughput when requests share context (chatbots, RAG, agents).
- **TensorRT-LLM** — NVIDIA's engine, the fastest raw numbers on NVIDIA hardware, but heavy setup and vendor lock-in.
- **TGI** (Hugging Face) — now in **maintenance mode**; Hugging Face itself points new users to vLLM or SGLang.

:::note
Pick by shape of traffic: **vLLM** as the safe general default; **SGLang** when many requests share a long prefix; **TensorRT-LLM** when you need maximum NVIDIA performance and can pay the setup cost; **Ollama/llama.cpp (GGUF)** for local and laptop use.
:::

:::warn
Two numbers trade off and you must pick: **throughput** (tokens/sec across all users, set by batching) versus **latency** (time-to-first-token and per-token speed for one user). Big batches maximise throughput but make each user wait longer. A chatbot wants low latency; a bulk document pipeline wants high throughput. Tune the engine for the one that matters.
:::
