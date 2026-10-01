## Two phases: prefill and decode

- LLM inference is not one workload — it is **two**, with opposite hardware profiles. Every serving design turns on this split.
- **Prefill:** read the whole prompt at once, compute attention over all input tokens in parallel, produce the first output token. It is **compute-bound** — the GPU's math units saturate.
- **Decode:** generate the rest one token at a time, each step attending over everything so far. It is **memory-bandwidth-bound** — the GPU spends its time reading weights and KV cache, not computing.

<svg viewBox="0 0 360 104" role="img" aria-label="Prefill processes all prompt tokens in parallel and is compute-bound; decode emits one token per step and is memory-bound" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="7" fill="#24405e">PREFILL — one big parallel pass</text>
  <g fill="#24405e"><rect x="20" y="20" width="16" height="16" rx="2"/><rect x="40" y="20" width="16" height="16" rx="2"/><rect x="60" y="20" width="16" height="16" rx="2"/><rect x="80" y="20" width="16" height="16" rx="2"/><rect x="100" y="20" width="16" height="16" rx="2"/><rect x="120" y="20" width="16" height="16" rx="2"/></g>
  <text x="78" y="48" text-anchor="middle" font-size="6" fill="#6b6b6b">all prompt tokens at once · compute-bound · sets TTFT</text>
  <text x="90" y="70" text-anchor="middle" font-size="7" fill="#a03050">DECODE — one token at a time</text>
  <g fill="#a03050"><rect x="20" y="78" width="16" height="16" rx="2"/></g><text x="44" y="90" font-size="10" fill="#a03050">→</text>
  <g fill="#d98aa0"><rect x="56" y="78" width="16" height="16" rx="2"/></g><text x="80" y="90" font-size="10" fill="#a03050">→</text>
  <g fill="#d98aa0"><rect x="92" y="78" width="16" height="16" rx="2"/></g><text x="116" y="90" font-size="10" fill="#a03050">→</text>
  <text x="250" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">each step reads all weights+KV · memory-bound · sets TPOT</text>
</svg>

- **Why it matters:** the two phases want different optimisations. Prefill benefits from raw FLOPs and big batches; decode benefits from memory bandwidth and the KV cache. A single GPU doing both interleaves them badly — a long prefill blocks everyone's decode, and vice versa.
- This one fact explains the whole engine cluster ahead: **continuous batching** (interleave many requests' decode steps), **chunked prefill** (slice long prompts so they do not stall decode), and **disaggregated serving** (put prefill and decode on separate GPU pools, page 17-32).

:::interview
"Why is the first token slow but the rest fast?"

The first token comes from **prefill** — a compute-bound pass over the entire prompt, so its cost grows with prompt length (this is your TTFT). Every later token comes from **decode** — one memory-bound step reading cached keys/values, roughly constant per token (this is your TPOT). Long prompts hurt TTFT; long outputs hurt total latency. Knowing which phase a latency problem lives in tells you which lever to pull.
:::
