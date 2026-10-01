## What problem does PagedAttention solve?

- The KV cache grows per token, but you don't know the final length up front. Naive serving **pre-allocates a contiguous block** for each request's max possible length — so most of it sits reserved-but-empty, and memory **fragments**. That wasted memory caps how many requests fit, which caps throughput.
- **PagedAttention** (vLLM) borrows OS **virtual memory paging**: split the KV cache into fixed-size **blocks (pages)** and allocate them **on demand** as the sequence grows, tracked by a block table. No need for contiguous allocation, almost no waste.
- Wins:
  - **Near-zero fragmentation** → many more concurrent requests on the same GPU → higher throughput.
  - **Block sharing** — identical prefixes (a shared system prompt, or parallel samples) can **share** physical blocks (copy-on-write), saving memory.
- It's a big reason vLLM became a default: it directly raises the concurrency ceiling that the KV cache imposes.

:::interview
What's really being tested: that PagedAttention applies OS-style paging to the KV cache to kill fragmentation and enable prefix sharing, raising concurrency/throughput — the KV-memory bottleneck fix.
:::
