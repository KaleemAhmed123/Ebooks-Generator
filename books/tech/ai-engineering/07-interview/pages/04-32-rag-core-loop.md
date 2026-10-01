## Walk me through a RAG pipeline end to end.

- **RAG (retrieval-augmented generation)** fetches relevant documents and puts them in the prompt so the model answers from real text, not memory — fixing stale knowledge and reducing hallucination.
- Two phases:
  - **Indexing (offline, once):** split documents into **chunks** → embed each chunk → store vectors (+ metadata) in a vector index.
  - **Query (per request):** embed the question → retrieve top-k nearest chunks → (optionally re-rank) → put them in the prompt with an instruction like "answer using only the context below" → generate, ideally with citations.
- The levers that decide quality: chunking, the embedding model, retrieval (dense + sparse + re-rank), and how you assemble the final prompt.

<svg viewBox="0 0 300 54" role="img" aria-label="Query embedded, nearest chunks retrieved and re-ranked, then passed with the question to the LLM to produce a cited answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="6" y="20" width="40" height="14" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="26" y="30" text-anchor="middle">query</text>
  <rect x="58" y="20" width="44" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="80" y="30" text-anchor="middle">retrieve</text>
  <rect x="114" y="20" width="44" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="136" y="30" text-anchor="middle">re-rank</text>
  <rect x="170" y="20" width="66" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="203" y="30" text-anchor="middle">prompt+chunks</text>
  <rect x="248" y="20" width="30" height="14" rx="2" fill="#24405e"/><text x="263" y="30" text-anchor="middle" fill="#fff">LLM</text>
  <path d="M46 27 L56 27" stroke="#1a1a1a" marker-end="url(#rg)"/><path d="M102 27 L112 27" stroke="#1a1a1a" marker-end="url(#rg)"/><path d="M158 27 L168 27" stroke="#1a1a1a" marker-end="url(#rg)"/><path d="M236 27 L246 27" stroke="#1a1a1a" marker-end="url(#rg)"/>
  <defs><marker id="rg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::interview
What's really being tested: that you can name both phases (offline index, per-query retrieve-then-generate) and know retrieval quality — not the LLM — is where RAG usually wins or fails.
:::
