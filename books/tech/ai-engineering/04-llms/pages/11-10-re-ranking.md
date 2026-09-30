## Re-ranking

- Retrieval is fast but coarse — it must scan millions of vectors, so it uses a cheap similarity that misses nuance. **Re-ranking** adds a second, slower, far more accurate pass over just the top candidates.
- The two-stage pattern: **retrieve** ~50–100 candidates cheaply, then **re-rank** them with a model that reads the query and each document *together* and keeps the best ~5.

<svg viewBox="0 0 322 66" role="img" aria-label="Bi-encoder retrieves many candidates fast; a cross-encoder re-scores each query-document pair together and keeps the top few" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="24" width="80" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="34" text-anchor="middle">retrieve</text><text x="48" y="42" text-anchor="middle" fill="#6b6b6b">~100, fast</text>
  <rect x="120" y="24" width="90" height="20" rx="3" fill="#24405e"/><text x="165" y="34" text-anchor="middle" fill="#fff">cross-encoder</text><text x="165" y="42" text-anchor="middle" fill="#ccd">re-score pairs</text>
  <rect x="242" y="24" width="72" height="20" rx="3" fill="#1a3a2a"/><text x="278" y="34" text-anchor="middle" fill="#fff">top 5</text><text x="278" y="42" text-anchor="middle" fill="#ccd">to the LLM</text>
  <path d="M88 34 L118 34" stroke="#1a1a1a" marker-end="url(#rr)"/><path d="M210 34 L240 34" stroke="#1a1a1a" marker-end="url(#rr)"/>
  <defs><marker id="rr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Bi-encoder** (retrieval) embeds query and document **separately**, then compares vectors — fast, precomputable, but the two never "see" each other. **Cross-encoder** (re-ranking) feeds the query and document **together** through a model that outputs one relevance score — far more accurate, but must run per pair, so only on the shortlist.
- As of September 2026, the common choices: **Cohere Rerank** (API), **BGE-reranker-v2-m3** (open, multilingual). Latency is ~tens of milliseconds per batch — the price of the accuracy jump.

:::note
Re-ranking is often the **single highest-ROI upgrade** to a basic RAG system. Retrieval gets the right chunk *somewhere* in the top 100; the re-ranker pulls it into the top 5 the LLM actually reads. It fixes the "answer was retrieved but ranked 12th" failure directly.
:::

:::warn
Re-ranking adds a network hop and latency, and re-ranks only what retrieval already found — if the right chunk is not in the initial candidates, no re-ranker can recover it. Get recall high first (hybrid search), *then* re-rank for precision. Order matters.
:::
