## What caching layers can an LLM application use?

- Several, at different granularities:
  - **Exact-match response cache** — same prompt in → cached response out. Trivial and free, but hit rate is low because prompts rarely match exactly.
  - **Semantic cache** — embed the query, and if a past query is **similar enough** (cosine above a threshold), return its cached answer. Catches paraphrases; risk is a false hit returning a subtly wrong answer, so set the threshold carefully and scope by user/context.
  - **Prompt / prefix (KV-cache) caching** — reuse the model's computed state for a shared prompt prefix (system prompt, tools, long document), skipping prefill. Big latency/cost win for repeated prefixes.
  - **Retrieval cache** — cache embeddings and frequent retrieval results in a RAG pipeline.
- Trade-offs: caches add **staleness** (invalidate when the underlying data/model changes) and semantic caches add a **correctness risk**. Cache aggressively where inputs repeat and answers are stable; avoid for personalised or fast-changing responses.

:::interview
What's really being tested: that you distinguish exact vs semantic vs prefix/KV caching, know the semantic-cache false-hit risk and staleness/invalidation concerns, and apply each where it fits.
:::
