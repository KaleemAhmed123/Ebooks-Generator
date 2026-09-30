## Hybrid search

- Vector search finds meaning but misses **exact terms** — a product code `X-4471`, a rare name, an acronym. Keyword search nails exact terms but misses paraphrases. **Hybrid search** runs both and fuses the results, covering each other's blind spots.
- The keyword half is usually **BM25** — the classic ranking function that scores a document by how often the query's rare words appear in it. It is a **sparse** method (matches literal tokens); embeddings are **dense** (match meaning).

<svg viewBox="0 0 320 74" role="img" aria-label="A query runs through dense vector search and sparse BM25 in parallel; RRF fuses the two ranked lists into one" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="30" width="50" height="16" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="33" y="41" text-anchor="middle">query</text>
  <rect x="96" y="10" width="86" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="139" y="21" text-anchor="middle">dense (vectors)</text>
  <rect x="96" y="50" width="86" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="139" y="61" text-anchor="middle">sparse (BM25)</text>
  <rect x="220" y="30" width="90" height="16" rx="3" fill="#24405e"/><text x="265" y="41" text-anchor="middle" fill="#fff">RRF fuse → one list</text>
  <path d="M58 36 L94 20" stroke="#1a1a1a" marker-end="url(#hy)"/><path d="M58 40 L94 58" stroke="#1a1a1a" marker-end="url(#hy)"/>
  <path d="M182 18 L228 34" stroke="#1a1a1a" marker-end="url(#hy)"/><path d="M182 58 L228 42" stroke="#1a1a1a" marker-end="url(#hy)"/>
  <defs><marker id="hy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Fusing two ranked lists with different score scales is the trick. **Reciprocal Rank Fusion (RRF)** solves it by ignoring the raw scores and using only the **ranks**:

:::mint
```
RRF(doc) = Σ  1 / (k + rank_in_list)      k ≈ 60
```
A document near the top of *either* list scores high. No score calibration needed — robust and near-parameter-free.
:::

:::note
Hybrid search is the reliable default for production RAG. It consistently beats dense-only on real corpora, especially ones full of names, codes, and jargon — exactly where pure semantic search quietly fails. Most vector DBs now offer it built in.
:::

:::warn
Hybrid is not automatically better if BM25 is misconfigured — wrong tokenizer, no stop-word handling, or a language it wasn't tuned for drags the fused result down. And you now maintain two indexes. Measure recall with and without the sparse half before assuming it helps.
:::
