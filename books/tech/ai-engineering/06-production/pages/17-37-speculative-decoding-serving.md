## Speculative decoding in serving

- Decode emits one token per forward pass, each pass reading the whole model from memory — the memory-bound bottleneck. **Speculative decoding** breaks the one-token-per-pass limit: a cheap **draft** proposes several tokens, and the big **target** model *verifies* them all in a single pass, keeping the longest correct prefix.
- It is **lossless** — the target model accepts a draft token only if it matches what the target would have produced, so output quality is identical. You get fewer forward passes for the same text.

<svg viewBox="0 0 360 84" role="img" aria-label="A draft model proposes four tokens; the target verifies them in one pass and accepts the first three" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle" font-size="6.5" fill="#6b6b6b">draft proposes (cheap)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="20" width="24" height="16"/><rect x="46" y="20" width="24" height="16"/><rect x="72" y="20" width="24" height="16"/><rect x="98" y="20" width="24" height="16"/></g>
  <text x="230" y="14" text-anchor="middle" font-size="6.5" fill="#6b6b6b">target verifies all in ONE pass</text>
  <g><rect x="180" y="20" width="24" height="16" fill="#1a3a2a"/><rect x="206" y="20" width="24" height="16" fill="#1a3a2a"/><rect x="232" y="20" width="24" height="16" fill="#1a3a2a"/><rect x="258" y="20" width="24" height="16" fill="#c0392b"/></g>
  <text x="218" y="50" text-anchor="middle" font-size="6" fill="#1a3a2a">accept 3 ✓</text><text x="270" y="50" text-anchor="middle" font-size="6" fill="#c0392b">reject, correct</text>
  <text x="180" y="72" text-anchor="middle" font-size="6" fill="#1a1a1a">4 tokens of progress from 1 target pass instead of 4</text>
</svg>

- **The serving win is throughput and latency at once**, when acceptance is high — 2–3× fewer target passes is common on predictable text. Both vLLM and TensorRT-LLM support it natively.
- **The serving catch:** the draft runs on the *same* GPU, competing for compute. Under heavy batching the target is already compute-saturated, so speculation *helps most at low-to-medium load* (spare compute to burn on drafting) and can even hurt at max batch. It is a latency lever for interactive traffic, not a throughput lever for saturated servers.

:::note
Speculative decoding trades *extra compute* (drafting + verifying rejected tokens) for *fewer memory-bound passes*. That is a good trade exactly when decode is memory-bound and compute is spare — the normal interactive case. Knowing it inverts under saturation is the detail that shows you have actually run it, not just read about it.
:::
