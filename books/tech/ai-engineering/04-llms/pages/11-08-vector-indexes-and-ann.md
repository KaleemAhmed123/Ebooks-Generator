## Vector indexes and ANN

- To retrieve, you must find the nearest vectors to the query among millions. Comparing against every vector — **exact** search — is `O(n)` per query and too slow at scale. **Approximate nearest neighbour (ANN)** trades a tiny bit of accuracy for enormous speed.
- The dominant algorithm is **HNSW (Hierarchical Navigable Small World)** — a layered graph you can walk toward the answer in roughly `O(log n)` hops.

<svg viewBox="0 0 316 74" role="img" aria-label="HNSW: a sparse top layer for big jumps, denser lower layers for fine navigation toward the nearest neighbour" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="8" y="16" fill="#6b6b6b">top: few nodes, long hops</text>
  <circle cx="40" cy="24" r="3" fill="#24405e"/><circle cx="150" cy="24" r="3" fill="#24405e"/><circle cx="260" cy="24" r="3" fill="#24405e"/>
  <line x1="40" y1="24" x2="150" y2="24" stroke="#24405e"/><line x1="150" y1="24" x2="260" y2="24" stroke="#24405e"/>
  <text x="8" y="52" fill="#6b6b6b">bottom: all nodes, fine steps</text>
  <g fill="#1a3a2a"><circle cx="40" cy="60" r="2"/><circle cx="80" cy="60" r="2"/><circle cx="120" cy="60" r="2"/><circle cx="150" cy="60" r="2"/><circle cx="190" cy="60" r="2"/><circle cx="230" cy="60" r="2"/><circle cx="260" cy="60" r="2"/></g>
  <line x1="40" y1="27" x2="40" y2="57" stroke="#bbb"/><line x1="150" y1="27" x2="150" y2="57" stroke="#bbb"/>
</svg>

- **Where the index lives** — a dedicated **vector database** (Pinecone, Weaviate, Qdrant, Milvus) or a library (FAISS) or a Postgres extension (`pgvector`). All expose the same idea: add vectors, query for top-k.
- Tuning knobs trade recall for speed and memory: HNSW's `M` (graph connectivity) and `ef_search` (how hard it looks). Higher = better recall, slower queries.

:::note
Choose by scale and ops. **pgvector** if your data already lives in Postgres and you have <a few million vectors — one fewer system to run. A **dedicated vector DB** when you need billions of vectors, metadata filtering at speed, or horizontal scaling.
:::

:::warn
ANN is **approximate** — it can miss the true nearest neighbour. At default settings recall is ~95–99%, usually fine, but that missing 1–5% can be exactly the chunk you needed. And filtering by metadata (date, author) *and* vector similarity at once is where many indexes get slow or inaccurate — test it on your real filters, not just raw similarity.
:::
