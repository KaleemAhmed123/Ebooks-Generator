## Explain prefill vs decode, and why they have different bottlenecks.

- **Prefill:** the model processes the entire prompt in **one parallel pass** to build the KV cache and produce the first token. It's **compute-bound** — lots of matmuls over many tokens at once, so the GPU's FLOPs are the limit.
- **Decode:** the model generates the rest **one token at a time**, each step reading the whole model and KV cache from memory to produce a single token. It's **memory-bandwidth-bound** — the GPU is starved waiting on memory, not maths.
- Consequences:
  - They scale differently: long prompts stress prefill (compute); long outputs stress decode (memory/time).
  - **TTFT** (time to first token) is dominated by prefill; **TPOT** (time per output token) by decode.
  - Optimisations split by phase: chunked prefill, prefix caching (prefill); continuous batching, speculative decoding (decode). Some systems even **disaggregate** prefill and decode onto different GPUs.

<svg viewBox="0 0 250 50" role="img" aria-label="Prefill processes the whole prompt at once (compute-bound), then decode emits tokens one by one (memory-bound)" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="16" width="70" height="18" rx="2" fill="#24405e"/><text x="45" y="28" text-anchor="middle" fill="#fff">prefill (parallel)</text><text x="45" y="46" text-anchor="middle" font-size="6.5" fill="#6b6b6b">compute-bound</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="100" y="16" width="16" height="18"/><rect x="120" y="16" width="16" height="18"/><rect x="140" y="16" width="16" height="18"/><rect x="160" y="16" width="16" height="18"/></g>
  <text x="138" y="28" text-anchor="middle" font-size="7">t t t t …</text><text x="138" y="46" text-anchor="middle" font-size="6.5" fill="#6b6b6b">decode: memory-bound</text>
</svg>

:::interview
What's really being tested: that prefill is compute-bound (parallel, sets TTFT) and decode is memory-bandwidth-bound (serial, sets TPOT), and that optimisations and even hardware split along that line.
:::
