## Serving the vector database

- RAG (Booklet 4) needs a **vector database** — the index that finds near-neighbours of a query embedding. In production it is its own serving system with its own scaling, latency, and cost profile, not a library call.
- The core is an **ANN** (approximate nearest neighbour) index, because exact search over millions-to-billions of vectors is too slow. ANN trades a small, tunable recall loss for sub-linear search.

| Index | Idea | Tradeoff |
|---|---|---|
| **HNSW** | navigable small-world graph | fast + high recall, memory-heavy |
| **IVF** | cluster, search nearest clusters | memory-light, tune probes for recall |
| **IVF-PQ** | IVF + product quantization | compresses vectors, some recall loss |
| **flat** | exact brute force | perfect recall, only small corpora |

- **The three knobs** are recall, latency, and memory — and they trade off. HNSW's `ef_search`, IVF's `nprobe`: higher means search more candidates → better recall, higher latency. Product quantization compresses vectors to fit memory at a recall cost. You tune these to the product's recall SLA, exactly like the goodput/latency tradeoff in LLM serving.
- **Scaling** is sharding the index across nodes (by vector or by tenant), replicating for query throughput, and handling **updates** — an index must ingest new vectors (the freshness SLA, 19-16b) without a full rebuild, which not all index types do gracefully.

:::note
The vector DB is a first-class serving component with the *same* disciplines as the LLM fleet: an SLA (recall + latency), capacity planning (memory dominated by the index, not the raw vectors — HNSW graphs are large), sharding and replication, and a freshness/update pipeline. The common mistake is treating it as "just a library" and discovering at scale that the index doesn't fit memory, updates require rebuilds, or recall silently degraded. In a RAG system-design answer, sizing and operating the vector DB — ANN choice, the recall/latency/memory knobs, sharding, updates — is as load-bearing as sizing the model fleet.
:::
