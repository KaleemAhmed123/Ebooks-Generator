## vLLM: what and why

- **vLLM** is the open-source inference engine that made high-throughput LLM serving the default. Two ideas carry it: **PagedAttention** (manage the KV cache like operating-system virtual memory) and **continuous batching** (schedule at every token step). It exposes an **OpenAI-compatible** HTTP API, so existing clients point at it unchanged. **[VERIFY current release]**
- It is the general-purpose pick: broad model support (200+ architectures), quantisation, tensor and pipeline parallelism, prefix caching, speculative decoding, and multi-LoRA — all in one server.

<svg viewBox="0 0 360 96" role="img" aria-label="vLLM sits between an OpenAI-compatible API and the GPU, running a scheduler, paged KV cache, and model executor" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="40" width="56" height="22" rx="3" fill="#f4f4f4" stroke="#888"/><text x="40" y="51" text-anchor="middle" font-size="6">clients</text><text x="40" y="59" text-anchor="middle" font-size="5.5" fill="#6b6b6b">/v1/chat</text>
  <rect x="88" y="18" width="180" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="178" y="14" text-anchor="middle" font-size="7" fill="#24405e">vLLM engine</text>
  <rect x="100" y="30" width="72" height="20" rx="3" fill="#fff" stroke="#24405e"/><text x="136" y="43" text-anchor="middle" font-size="6">scheduler</text>
  <rect x="184" y="30" width="72" height="20" rx="3" fill="#fff" stroke="#24405e"/><text x="220" y="43" text-anchor="middle" font-size="6">paged KV cache</text>
  <rect x="142" y="56" width="72" height="20" rx="3" fill="#24405e"/><text x="178" y="69" text-anchor="middle" font-size="6" fill="#fff">model executor</text>
  <rect x="288" y="40" width="60" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="318" y="54" text-anchor="middle" font-size="6">GPU(s)</text>
  <path d="M68 51 L86 51" stroke="#888" marker-end="url(#vw)"/><path d="M268 51 L286 51" stroke="#888" marker-end="url(#vw)"/>
  <defs><marker id="vw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it wins:** before vLLM, KV-cache fragmentation wasted 60–80% of GPU memory and static batching left GPUs idle. vLLM's paging drove memory waste under ~4% and its scheduler kept the batch full, together lifting throughput several-fold on the same hardware.
- Everything in this cluster unpacks those two ideas, then shows the exact commands to serve a model and the failure modes that bite in production.

:::note
When someone says "just use vLLM," they mean it as the safe default — the engine you reach for unless a specific workload (heavy shared prefixes → SGLang; absolute peak on NVIDIA → TensorRT-LLM) justifies something else. Knowing *why* it is the default, and when it is not, is the interview signal.
:::
