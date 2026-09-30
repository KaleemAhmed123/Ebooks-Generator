## Information retrieval and search

- **Information retrieval (IR)** finds the documents in a collection most relevant to a query. It is the engine behind search bars and the "retrieve" half of RAG.
- Two families, and modern systems use both.

### Lexical vs. semantic search

- **Lexical (keyword) search.** Match query words to document words. **BM25** is the standard: a refined TF-IDF that also accounts for document length and diminishing returns on repeated terms. Fast, no training, still a top baseline in 2026.
- **Semantic (dense) search.** Embed the query and every document into vectors (later pages), then return the nearest vectors by cosine similarity. Finds documents that *mean* the same thing even with no shared words.

<svg viewBox="0 0 360 74" role="img" aria-label="A query goes down two paths, keyword BM25 and dense embedding, whose results are fused" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="30" width="50" height="20" rx="3" fill="#24405e"/><text x="37" y="43" text-anchor="middle" fill="#fff">query</text>
  <path d="M64 36 L108 20" stroke="#1a1a1a" marker-end="url(#i)"/><path d="M64 44 L108 60" stroke="#1a1a1a" marker-end="url(#i)"/>
  <rect x="112" y="10" width="100" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="162" y="23" text-anchor="middle">BM25 (keyword)</text>
  <rect x="112" y="50" width="100" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="162" y="63" text-anchor="middle">dense (meaning)</text>
  <path d="M214 20 L258 34" stroke="#1a1a1a" marker-end="url(#i)"/><path d="M214 60 L258 42" stroke="#1a1a1a" marker-end="url(#i)"/>
  <rect x="262" y="28" width="86" height="20" rx="3" fill="#1a3a2a"/><text x="305" y="41" text-anchor="middle" fill="#fff">fuse → ranked</text>
  <defs><marker id="i" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Neither wins alone. Keyword search nails exact terms — product codes, names, rare jargon — that a dense model blurs; semantic search catches paraphrases keyword search misses. **Hybrid search** runs both and fuses the rankings, and it is the 2026 default for serious retrieval. Booklet 4 turns this into a full RAG pipeline with re-ranking.
:::
