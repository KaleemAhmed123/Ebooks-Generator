## How do you choose and evaluate an embedding model for retrieval?

- An **embedding model** maps text to a vector so that semantically similar texts are near in cosine distance — the backbone of semantic search and RAG.
- Selection axes:
  - **Retrieval quality** on *your* domain — benchmarks like **MTEB** are a starting point, not the answer; always test on your own queries/documents.
  - **Dimension** — bigger vectors can be more accurate but cost more to store and search; some models support **Matryoshka** truncation to trade off.
  - **Max sequence length** — must cover your chunk size.
  - **Cost/latency** — API vs self-hosted; throughput for indexing millions of docs.
- Evaluate with retrieval metrics on a labelled set: **recall@k** (did the right doc make the top k) and **nDCG** (ranking quality), measured on queries that look like production.

:::warn
Leaderboard rank ≠ your performance. Models can overfit public benchmarks; a mid-ranked model may win on your domain. Always run a domain eval before committing.
:::

:::interview
What's really being tested:

that you evaluate on your own data with recall@k/nDCG, treat MTEB as a prior, and weigh dimension/length/cost — not just "pick the top of the leaderboard."
:::
