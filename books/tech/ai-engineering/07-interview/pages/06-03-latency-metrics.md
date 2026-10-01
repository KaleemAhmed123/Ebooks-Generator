## What latency metrics matter for an LLM service, and how do they trade off?

- Four numbers, not one:
  - **TTFT (time to first token)** — how long until the user sees *something*. Dominated by prefill + queue wait. Critical for perceived responsiveness (chat, voice).
  - **TPOT / ITL (time per output token / inter-token latency)** — streaming speed once started. Must beat reading speed (~a few tokens/sec feels smooth).
  - **End-to-end latency** — total time = TTFT + TPOT × output length.
  - **Throughput** — total tokens/sec across all requests; the cost-efficiency number.
- The core tension: **throughput vs latency.** Bigger batches use the GPU better (higher throughput, lower cost per token) but make each request wait longer (worse TTFT/TPOT). Serving is tuning this trade for your SLO.
- Measure **percentiles (p50/p95/p99)**, not averages — tail latency is what users feel and what SLOs promise.

:::interview
What's really being tested: that you separate TTFT (first token) from TPOT (streaming speed) from throughput, know the batch-size throughput↔latency tradeoff, and report percentiles not means.
:::
