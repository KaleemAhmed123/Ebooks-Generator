## What is continuous batching, and why does it beat static batching for LLMs?

- **Static batching** waits to collect N requests, runs them together, and returns when the **slowest** finishes. Because outputs vary wildly in length, short requests sit idle waiting for long ones — the GPU wastes cycles and latency suffers.
- **Continuous (in-flight) batching** works at the **token** level: as soon as one request in the batch finishes, it's evicted and a **new** request is slotted in immediately, every decode step. The batch is dynamic, so the GPU stays saturated with active sequences.
- Result: far higher GPU utilisation and throughput, and no short request stuck behind a long one. It's the core scheduling trick in vLLM and modern serving engines.
- Often paired with **chunked prefill** (interleave prefill chunks with ongoing decodes) so a big new prompt doesn't stall everyone's token generation.

:::interview
What's really being tested: that continuous batching swaps requests in/out at the token level to keep the GPU full (vs static batching's slowest-wins waste) — the key to high serving throughput.
:::
