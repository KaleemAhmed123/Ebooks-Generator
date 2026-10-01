## Rapid mock: LLM-enhanced recommendations

- **Prompt:** "Improve a recommendation system with LLMs." **Clarify:** existing collaborative-filtering recommender, millions of items and users, sub-100ms serving, cold-start (new items/users) is the pain, explanations wanted.
- The key insight: **don't replace the recommender with an LLM** — use the LLM where it's uniquely good (semantics, cold-start, explanation) and keep the fast retrieval where it's good.

- **Where the LLM earns its place.** *Cold-start* — embed a new item's text/description so it's recommendable immediately, before it has interaction data (the classic CF weakness). *Semantic re-ranking* — rerank the CF candidates with an LLM that understands nuance ("like this but for kids"). *Explanations* — generate "because you watched X" rationales. *Query understanding* — turn a natural-language request into retrieval filters.
- **What stays classical.** The heavy lifting — retrieving candidates from millions of items in <100ms — stays a fast vector/CF lookup (17-28c). An LLM in the hot path for every candidate would blow the latency budget; it operates on the *top-k* only, or *offline* (precompute embeddings, explanations).

:::interview
"How would you add an LLM to a recommender without wrecking latency?"

Keep the LLM off the hot path and use it where it's uniquely strong. Fast candidate retrieval stays classical (CF/vector over millions of items in <100ms); the LLM operates only on the **top-k** (semantic rerank, explanations) or **offline** (embed new items for cold-start, precompute rationales). That fixes CF's real weaknesses — cold-start and semantic nuance — without paying LLM latency per candidate. The anti-pattern is "replace the recommender with an LLM," which is slow, expensive, and worse at the core retrieval; the win is a hybrid where each component does what it's best at.
:::
