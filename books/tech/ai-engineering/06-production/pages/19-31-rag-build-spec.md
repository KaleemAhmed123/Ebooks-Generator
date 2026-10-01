## Flagship 3: production RAG — spec

- **Goal:** build the retrieval pipeline that a real RAG assistant runs on — advanced chunking, hybrid search, reranking, query rewriting, and a two-stage evaluation — as runnable code. The mock (19-05) designed the system; this *builds* the retrieval core.
- **The pipeline**, each stage a real component:

<svg viewBox="0 0 360 84" role="img" aria-label="RAG retrieval core: query rewrite, hybrid retrieve (BM25 + dense), fuse, rerank, top-k to generator" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="34" width="46" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="31" y="45" text-anchor="middle">query</text>
  <rect x="62" y="34" width="52" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="88" y="45" text-anchor="middle" font-size="6">rewrite/HyDE</text>
  <rect x="122" y="18" width="50" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="147" y="28" text-anchor="middle" font-size="6">BM25</text>
  <rect x="122" y="52" width="50" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="147" y="62" text-anchor="middle" font-size="6">dense</text>
  <rect x="180" y="34" width="40" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="200" y="45" text-anchor="middle" font-size="6">fuse (RRF)</text>
  <rect x="228" y="34" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="251" y="45" text-anchor="middle">rerank</text>
  <rect x="282" y="34" width="70" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="317" y="45" text-anchor="middle" font-size="6">top-k → LLM</text>
  <path d="M54 42 L60 42" stroke="#888" marker-end="url(#rg)"/><path d="M114 40 L120 27 M114 44 L120 57" stroke="#888" marker-end="url(#rg)"/><path d="M172 27 L178 40 M172 59 L178 46" stroke="#888" marker-end="url(#rg)"/><path d="M220 42 L226 42" stroke="#888" marker-end="url(#rg)"/><path d="M274 42 L280 42" stroke="#888" marker-end="url(#rg)"/>
  <defs><marker id="rg" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Why each stage exists.** *Chunking* decides what a retrievable unit is. *Hybrid* (keyword BM25 + dense vectors) catches both exact-term and semantic matches. *Fusion* (RRF) merges the two rankings. *Reranking* (a cross-encoder) reorders the top candidates precisely. *Query rewriting/HyDE* fixes the mismatch between how users ask and how documents are written.
- **The measured outcome** is retrieval precision/recall and generation faithfulness — the two-surface eval from the mock (19-06), built here.

:::note
This is the cluster that most separates a demo RAG ("embed docs, cosine-search, stuff top-5") from a production one. The demo works on easy queries and fails on the hard ones that matter — exact identifiers keyword search would catch, questions phrased unlike the documents, near-duplicate chunks crowding out the answer. Each stage here targets a specific failure of naive RAG, which is why "just add a vector DB" is where most RAG projects stall.
:::
