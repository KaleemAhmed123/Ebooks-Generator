## LlamaIndex: advanced retrieval

- LlamaIndex's depth is in *retrieval quality* — the RAG failure-mode fixes of Booklet 4, available as composable pieces. For a data-heavy agent, these are what separate a demo from a trustworthy answer. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="A retrieval pipeline: hybrid search, re-ranking, and sub-question decomposition feeding synthesis" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="38" width="66" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="47" text-anchor="middle">hybrid</text><text x="43" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">vector+keyword</text>
  <rect x="92" y="38" width="66" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="125" y="47" text-anchor="middle">re-rank</text><text x="125" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">cross-encoder</text>
  <rect x="174" y="38" width="80" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="214" y="47" text-anchor="middle">sub-question</text><text x="214" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">split query</text>
  <rect x="270" y="36" width="80" height="26" rx="3" fill="#24405e"/><text x="310" y="52" text-anchor="middle" fill="#fff">synthesize</text>
  <path d="M76 49 L90 49" stroke="#888" marker-end="url(#ar2)"/><path d="M158 49 L172 49" stroke="#888" marker-end="url(#ar2)"/><path d="M254 49 L268 49" stroke="#888" marker-end="url(#ar2)"/>
  <defs><marker id="ar2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Hybrid search** — combine vector (semantic) and keyword (BM25) retrieval, fused (e.g. RRF), so you catch both meaning and exact terms (Booklet 4). A built-in retriever option.
- **Re-ranking** — a cross-encoder re-scores the top candidates for relevance before they hit the prompt, cutting the noise that causes wrong answers (Booklet 4's re-ranking). A post-processor you plug in.
- **Sub-question query engine** — for a complex question spanning sources, LlamaIndex *decomposes* it into sub-questions, answers each against the right index, and synthesizes — retrieval-side plan-and-execute (14-10).
- **Metadata filtering** — restrict retrieval by attributes (date, author, doc type), so "the *2026* policy" does not return the 2019 one.

- These compose into a pipeline: hybrid retrieve → re-rank → (decompose if needed) → synthesize with citations. Assembling this by hand is the bulk of production RAG work; here it is configuration.

:::interview
"A RAG agent returns plausible but wrong answers — what retrieval fixes do you try?"

In order: hybrid search (so exact terms aren't missed by pure vector search), a re-ranker (cross-encoder rescoring the top-k to cut irrelevant chunks — the usual biggest win), metadata filtering (so it retrieves the *right version/date*), and sub-question decomposition for multi-part questions. LlamaIndex exposes all of these as composable retriever/post-processor options, which is exactly why it's favored for data-heavy agents — the fixes are configuration, not custom infrastructure.
:::
