## Design a recommendation system using embeddings.

- **Requirements:** suggest relevant items to users at scale, low latency, fresh, personalised.
- **Two-stage architecture (standard for recsys):**
  - **Candidate generation (retrieval)** — embed users and items into a shared space; for a user, **ANN-retrieve** the nearest few hundred items from millions. Embeddings come from a **two-tower** model (user tower + item tower trained so relevant pairs are close).
  - **Ranking** — a heavier model re-scores the few hundred candidates with richer features (recency, context, business rules) to produce the final ordered list.
- **Why embeddings:** they turn "find relevant items" into fast nearest-neighbour search, and capture semantic/behavioural similarity that keyword rules can't.
- **Serving:** precompute item embeddings (batch, refresh on change); compute user embedding at request time (or cache); ANN index sharded/replicated for QPS; cache popular results.
- **Cold start:** new users/items lack interaction data → fall back to content-based embeddings (item metadata, LLM-generated descriptions) or popularity.
- **Eval:** offline (recall@k, nDCG) + **online A/B** on engagement/conversion (the real metric). Watch feedback loops/filter bubbles.
- **Tradeoffs:** embedding freshness vs cost, candidate count (recall vs ranking cost), personalisation vs diversity.

:::interview
What's really being tested: the two-stage retrieve-then-rank design, two-tower embeddings + ANN for candidate generation, cold-start handling, and online A/B on engagement — classic recsys with embeddings.
:::
