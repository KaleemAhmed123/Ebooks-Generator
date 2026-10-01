## How does a vector database find nearest neighbours so fast?

- Comparing a query vector to millions of document vectors one by one (**exact / brute-force** search) is accurate but O(N) per query — too slow at scale.
- **Approximate nearest neighbour (ANN)** indexes trade a little recall for huge speed. The main families:
  - **HNSW (graph-based):** build a multi-layer "small-world" graph; search greedily hops toward the query. Excellent recall/latency, high memory, the common default.
  - **IVF (inverted file / clustering):** cluster vectors; at query time search only the nearest few clusters. Tunable via how many clusters you probe.
  - **PQ (product quantization):** compress vectors into codes so billions fit in memory, usually combined with IVF (IVF-PQ).
- Key knobs trade **recall vs latency vs memory**: HNSW's `ef_search`/`M`, IVF's `nprobe`. More search effort → higher recall, slower.

:::interview
What's really being tested: that you know ANN is approximate-by-design, can name HNSW vs IVF(-PQ), and understand the recall/latency/memory knobs — not just "use a vector DB."
:::
