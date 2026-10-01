## What is re-ranking, and why add a second retrieval stage?

- First-stage retrieval (ANN / BM25) is optimised for **speed over millions** of chunks, using a **bi-encoder**: query and document are embedded *separately*, so the model never sees them together — fast but coarse.
- A **re-ranker** is a **cross-encoder**: it feeds the query and a candidate **together** into a transformer that scores their relevance directly. Far more accurate because it can model fine-grained interaction — but too slow to run over the whole corpus.
- So you use **two stages**: retrieve ~50–100 candidates cheaply (bi-encoder/BM25), then re-rank those with the cross-encoder and keep the top 3–5 for the prompt.
- This is often the single biggest quality jump in a RAG pipeline — it fixes "the right chunk was retrieved but ranked 30th." [VERIFY: current rerankers — Cohere Rerank, BGE-reranker-v2-m3.]

<svg viewBox="0 0 280 48" role="img" aria-label="Millions of chunks narrowed to about 100 by fast retrieval, then re-ranked to the top 5 by a cross-encoder" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="6" y="16" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="41" y="27" text-anchor="middle">millions</text>
  <rect x="104" y="16" width="60" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="134" y="27" text-anchor="middle">top ~100</text>
  <rect x="196" y="16" width="56" height="16" rx="2" fill="#24405e"/><text x="224" y="27" text-anchor="middle" fill="#fff">top 5</text>
  <path d="M76 24 L102 24" stroke="#1a1a1a" marker-end="url(#rr)"/><text x="89" y="13" text-anchor="middle" font-size="6.5" fill="#6b6b6b">ANN/BM25</text>
  <path d="M164 24 L194 24" stroke="#1a1a1a" marker-end="url(#rr)"/><text x="179" y="13" text-anchor="middle" font-size="6.5" fill="#6b6b6b">cross-enc</text>
  <defs><marker id="rr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::interview
What's really being tested: bi-encoder (fast, separate) vs cross-encoder (accurate, joint), why you need both in a funnel, and that re-ranking is often the biggest RAG quality lever.
:::
