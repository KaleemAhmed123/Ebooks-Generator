## Continuous batching and chunked prefill

- vLLM's scheduler runs **iteration-level**: at every forward pass it decides which requests are in the batch. A finished request's slot is refilled the same step, so the GPU never idles waiting for the slowest member (page 17-10).
- The hard part is mixing **prefill** and **decode** in one batch. A long prefill (thousands of prompt tokens) monopolises the pass and stalls every other request's decode — a latency spike users feel as a freeze.

<svg viewBox="0 0 360 92" role="img" aria-label="Chunked prefill slices a long prompt into pieces interleaved with ongoing decode steps" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="80" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">without chunking</text>
  <rect x="16" y="18" width="120" height="12" fill="#a03050"/><text x="76" y="27" text-anchor="middle" font-size="5.5" fill="#fff">one huge prefill blocks the pass</text>
  <rect x="140" y="18" width="16" height="12" fill="#6a9bd0"/><text x="180" y="27" font-size="5.5" fill="#a03050">decodes wait →</text>
  <text x="80" y="52" text-anchor="middle" font-size="6.5" fill="#1a3a2a">with chunked prefill</text>
  <g><rect x="16" y="58" width="30" height="12" fill="#24405e"/><rect x="48" y="58" width="14" height="12" fill="#6a9bd0"/><rect x="64" y="58" width="30" height="12" fill="#24405e"/><rect x="96" y="58" width="14" height="12" fill="#6a9bd0"/><rect x="112" y="58" width="30" height="12" fill="#24405e"/><rect x="144" y="58" width="14" height="12" fill="#6a9bd0"/></g>
  <text x="200" y="67" font-size="5.5" fill="#1a3a2a">navy=prefill chunk, blue=decode — interleaved</text>
</svg>

- **Chunked prefill** slices a long prompt into fixed token budgets and interleaves those chunks with ongoing decode steps. Prefill still finishes, but decode never stalls for more than one chunk — TTFT for new requests and TPOT for running ones both stay smooth. In the current vLLM engine this scheduling is on by default.
- The knob is `--max-num-batched-tokens`: the token budget per pass. Larger favours prefill throughput; smaller favours decode smoothness. This is the main latency/throughput dial you tune to an SLO.

:::note
Continuous batching answers "keep the GPU full"; chunked prefill answers "keep it full *fairly*." Together they let one server hold a smooth per-user latency **and** high aggregate throughput — the two goals that naive batching forces you to trade off. This is the machinery behind the "goodput" metric in the next cluster.
:::
