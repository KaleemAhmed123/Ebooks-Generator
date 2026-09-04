## KV Cache

*key-value cache*

Generation emits one token at a time, and each new token attends over every
earlier one, computing a key and a value per earlier token. Those depend only on
the tokens before them, so they are identical every time. The cache stores them
once and reuses them — which is why a long prompt is expensive on its first pass
and cheap for every token after.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The first pass computes keys and values for the whole prompt, and each subsequent token reads that cache and appends one entry rather than recomputing the prompt">
  <text x="4" y="18" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">prefill</text>
  <rect x="60" y="8" width="220" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.3"/>
  <text x="170" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">whole prompt computed once</text>
  <text x="4" y="48" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">decode</text>
  <rect x="60" y="38" width="220" height="18" fill="none" stroke="#c25a35" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="170" y="51" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">read from cache</text>
  <g fill="#1a1a1a">
    <rect x="286" y="38" width="10" height="18"/><rect x="300" y="38" width="10" height="18"/><rect x="314" y="38" width="10" height="18"/><rect x="328" y="38" width="10" height="18"/>
  </g>
  <text x="344" y="51" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">one new entry each</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the cache only grows — length times concurrency is what runs out</text>
</svg>

**Memory, not compute, is what caps concurrency.** The cache grows with sequence
length times requests in flight, and on self-hosted serving it runs out before the
weights do. vLLM's PagedAttention paper attacks exactly this fragmentation,
reporting 2–4× throughput at the same latency.

## Latency Budget for AI Features

A total time target split across stages — retrieval, rerank, prefill, generation,
post-processing — written down before anyone optimises anything.

Writing it down does two things immediately. It shows which stages are worth
touching: a reranker holding 150ms of a 3,000ms budget is not the problem, however
ugly the code looks when you read it. And it forces a number, where "it should
feel fast" can be neither tested nor missed. Measure each stage separately in
traces; the total says there is a problem, the breakdown says where.

<svg viewBox="0 0 460 68" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An example three second budget drawn as a bar: a short retrieval segment, a shorter rerank segment, a time-to-first-token segment, and a long streaming tail">
  <rect x="4" y="16" width="52" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="56" y="16" width="38" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="94" y="16" width="96" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <rect x="190" y="16" width="266" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="30" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">retrieve</text>
  <text x="75" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">rerank</text>
  <text x="142" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">first token</text>
  <text x="323" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">streaming</text>
  <path d="M4 44 H190" stroke="#c25a35" stroke-width="1"/>
  <path d="M4 41 V47 M190 41 V47" stroke="#c25a35" stroke-width="1"/>
  <text x="4" y="62" font-family="Georgia,serif" font-size="9" fill="#c25a35">only the marked span is silence — that is the part users score</text>
</svg>

**Budget time to first token separately from total time.** Users tolerate a long
streamed answer and will not tolerate silence, so retrieving six chunks instead of
forty can improve the experience while the total-time graph records a regression.
