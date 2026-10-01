# Production & System Design

## What makes serving an LLM different from serving a normal web service?

- A normal request is cheap, uniform, and fast. An LLM request is **expensive, variable-length, and stateful mid-generation** — that changes everything about the serving stack.
- Key differences:
  - **Two phases** — a compute-heavy **prefill** (process the whole prompt) then a memory-bound **decode** (generate tokens one at a time). You optimise them differently.
  - **Variable, unpredictable duration** — output length isn't known up front, so you can't size requests like fixed API calls.
  - **Memory-bound by the KV cache** — concurrency is capped by GPU memory for the cache, not CPU or QPS.
  - **Streaming** — tokens come out incrementally; users judge **time-to-first-token**, not just total time.
  - **Cost per request is 100–1000× a normal API** — so batching, caching, and GPU utilisation are first-order concerns, not afterthoughts.
- The whole serving discipline (continuous batching, paged attention, goodput) exists because of these properties.

:::interview
What's really being tested: that you grasp why LLM serving needs its own stack — two-phase, variable-length, KV-cache-memory-bound, streaming, and dominated by GPU cost.
:::
