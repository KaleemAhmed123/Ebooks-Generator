## Exact vs approximate nearest-neighbour search — when is approximate actually fine?

- **Exact** search guarantees the true top-k but costs O(N·d) per query — fine for thousands of vectors, infeasible for tens of millions at low latency.
- **ANN** returns *most* of the true neighbours much faster. "Recall@10 = 0.95" means it finds 95% of the true top-10 on average.
- Approximate is fine when:
  - A **downstream re-ranker** re-scores the candidates — small recall misses in stage 1 get fixed, so you can run ANN loosely and fast.
  - The application tolerates occasionally missing a borderline chunk (most RAG/search).
- Prefer exact when the corpus is small enough, or when a single missed neighbour is unacceptable (some compliance/legal retrieval) — then widen the candidate set or use exact on a pre-filtered subset.
- Practical pattern: **ANN to get ~100 candidates fast, then a precise re-ranker on those** — approximate where it's cheap, exact where it matters.

:::interview
What's really being tested: that you weigh recall vs latency per use-case and know a re-ranker lets you run ANN aggressively because stage 2 recovers the misses.
:::
