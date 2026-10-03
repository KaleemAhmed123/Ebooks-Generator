## vLLM, SGLang, TensorRT-LLM — how do you choose a serving engine?

- All do continuous batching + paged KV cache; they differ in focus and ergonomics.
  - **vLLM** — the popular open default. PagedAttention, broad model support, easy `vllm serve`, OpenAI-compatible API. Great general-purpose choice; strong throughput with low setup cost.
  - **SGLang** — adds **RadixAttention** (automatic prefix-cache sharing via a radix tree), excelling when many requests share prefixes (agents with fixed system prompts, few-shot). Strong for structured/complex generation and high prefix reuse.
  - **TensorRT-LLM** — NVIDIA's compiled engine: you **build** an optimised engine per model/GPU. Best raw latency/throughput on NVIDIA hardware (FP8/FP4 on Hopper/Blackwell), but the build step and NVIDIA-only lock-in are a real tax.
- Decision axes: **ease vs peak performance** (vLLM easy ↔ TRT-LLM fast-but-fiddly), **prefix-reuse** workloads (SGLang), hardware lock-in, and model coverage.
- Pragmatic path: **start with vLLM**; move to SGLang for heavy prefix sharing or TensorRT-LLM when you need the last drop of performance and can pay the build/lock-in cost.

:::interview
What's really being tested: that you can differentiate them (vLLM general/easy, SGLang prefix-sharing, TRT-LLM compiled/fastest-but-NVIDIA) and reason from workload to choice, not name-drop.
:::
