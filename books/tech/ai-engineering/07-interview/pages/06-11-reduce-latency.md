## A chat product's responses feel slow. How do you reduce latency?

- First decide **which** latency: slow to *start* (TTFT) or slow to *stream* (TPOT)? They have different fixes.
- **Cut TTFT (first token):**
  - **Prompt/prefix caching** — reuse the KV cache for the shared system prompt so prefill is skipped.
  - **Shorten the prompt** — fewer/retrieved-not-dumped context tokens; trim few-shot.
  - **Reduce queue wait** — more capacity/autoscale, priority scheduling for interactive traffic.
- **Cut TPOT (streaming speed):**
  - **Speculative decoding** — draft model proposes tokens, big model verifies in parallel.
  - **Smaller/quantized model** or a cheaper model for easy requests (routing).
  - **Better engine/hardware** (vLLM/TRT-LLM, newer GPUs).
- **Perceived latency:** always **stream** tokens, and show work early — users tolerate a slow total if the first token is fast.
- Measure p95/p99 before and after; optimise the phase that's actually the bottleneck.

:::interview
What's really being tested: that you split TTFT vs TPOT and apply the right lever to each (caching/prompt-trim for TTFT, spec-decoding/smaller-model for TPOT) plus streaming for perceived speed.
:::
