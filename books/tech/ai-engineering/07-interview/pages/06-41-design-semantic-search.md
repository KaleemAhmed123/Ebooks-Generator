## Design a semantic search system (no generation).

- **Requirements:** return the most relevant documents for a query over a large corpus; low latency at high QPS; good relevance; fresh index.
- **Indexing:** documents → chunk (or index whole, per use case) → **embed** with a retrieval model → store vectors in an **ANN index (HNSW)** with metadata; pipeline for incremental add/update/delete.
- **Query path:**
  - **Hybrid retrieval** — dense (embeddings, for meaning) + sparse (BM25, for exact terms), fused via RRF. This alone fixes most "semantic search misses exact IDs" complaints.
  - **Metadata filtering** — permissions, recency, type.
  - **Re-ranking** — cross-encoder on top ~100 for final ordering when precision matters.
- **Scale:** shard the index across nodes, replicate for QPS; ANN keeps per-query latency low; cache hot queries.
- **No LLM generation** needed — cheaper and faster than RAG; add generation only if users want synthesised answers.
- **Eval:** recall@k, nDCG, MRR on a labelled set from real queries; monitor relevance and latency; watch for drift in query distribution.
- **Tradeoffs:** embedding dimension (accuracy vs storage/latency), re-rank depth (quality vs latency), hybrid weighting.

:::interview
What's really being tested: that you build hybrid retrieval + filtering + optional re-rank, scale the index by sharding/replication, evaluate with recall@k/nDCG — and know this is cheaper than RAG because there's no generation.
:::
