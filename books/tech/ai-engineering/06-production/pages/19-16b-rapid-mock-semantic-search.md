## Rapid mock: semantic search platform

- **Prompt:** "Design a semantic search platform serving many products (search over docs, products, support tickets)." **Clarify:** billions of items, sub-100 ms search, freshness matters, multi-tenant, relevance is the product.
- This is RAG's retrieval half (Flagship 3) as a standalone platform — and the design turns on the **vector index** at scale.

- **The core decisions.** *Embedding model* served as a separate prefill-only service (17-28a), embedding once at ingest. *Vector DB* with an **ANN** (approximate nearest neighbour) index — HNSW or IVF (Booklet 4) — because exact search over billions is too slow; ANN trades a little recall for orders-of-magnitude speed. *Hybrid* (BM25 + dense, RRF) for recall (19-33), *rerank* the top-k for precision (19-34). Multi-tenant isolation and per-tenant indexes (or metadata filtering) like the platform mock (19-07).
- **Freshness** is an ingestion SLA: new items must be embedded and indexed within the freshness window, which is a batch-pipeline throughput problem (embedding is the batch-tier workload).

:::interview
"How do you search over a billion vectors in under 100 ms?"

You don't search them exactly — you use an **ANN index** (HNSW/IVF) that trades a small, tunable recall loss for sublinear search, so latency stays flat as the corpus grows. Around it: a **separate embedding service** (prefill-only, batches at ingest), **hybrid retrieval** (BM25 + dense with RRF) so exact-term and semantic queries both work, and a **reranker** on the top candidates for precision. The scale levers are the ANN parameters (recall vs latency vs memory) and sharding the index across nodes. Naming ANN as *the* enabling trick — and that it's approximate by design — is the signal; exact nearest-neighbour at a billion vectors is the junior answer.
:::
