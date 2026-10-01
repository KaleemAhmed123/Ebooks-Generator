## Design a RAG system over 10M documents serving 500 QPS.

- **Requirements:** fresh, citable answers; low latency; 10M docs (→ tens of millions of chunks); 500 QPS; quality bar (groundedness) and cost ceiling.
- **Indexing (offline):** ingest → **chunk** (structure-aware, parent-document) → **embed** (batch on GPUs) → store in a **vector DB with HNSW** + metadata (source, date, ACL). Pipeline for incremental updates and re-embedding on model change.
- **Query path:** embed query → **hybrid retrieve** (dense HNSW + BM25, fuse with RRF) with **metadata/ACL filter** → **cross-encoder re-rank** top ~100 → keep top 5 → assemble prompt → LLM (stream) with citations.
- **Scale:** 500 QPS hits the **vector DB** (shard/replicate the index; ANN keeps it fast) and the **LLM tier** (the expensive part — size GPUs by output-token throughput; cache the static prompt prefix). Re-ranker is a mid-size model tier.
- **Quality & ops:** RAG-triad evals (context relevance / faithfulness / answer relevance) on a golden set; trace every query (retrieved chunks + answer); monitor retrieval recall and groundedness; handle "no good context → say I don't know."
- **Tradeoffs:** re-ranking + hybrid add latency/cost but are the main quality levers; tune top-k and model size to the SLO.

:::interview
What's really being tested: a complete pipeline (index → hybrid+filter+rerank → generate), scaling the vector DB *and* LLM tiers separately, ACL-filtered retrieval, and a concrete eval/monitoring plan.
:::
