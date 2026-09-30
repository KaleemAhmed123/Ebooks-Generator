## Query rewriting and expansion

- Users write bad queries: vague, misspelled, missing context, or spread across a conversation. Retrieval embeds the query *as written*, so a poor query retrieves poor chunks. **Query rewriting** fixes the query before it hits the index.
- Four techniques, cheap to add:

<svg viewBox="0 0 320 78" role="img" aria-label="Four query transforms: rewrite for clarity, decompose into sub-questions, HyDE generates a hypothetical answer, multi-query fans out variations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="8" width="150" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="81" y="20" text-anchor="middle" font-size="7.5" fill="#24405e">rewrite</text><text x="81" y="30" text-anchor="middle">resolve "it", fix, clarify</text>
  <rect x="164" y="8" width="150" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="239" y="20" text-anchor="middle" font-size="7.5" fill="#24405e">decompose</text><text x="239" y="30" text-anchor="middle">1 hard Q → sub-questions</text>
  <rect x="6" y="42" width="150" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="81" y="54" text-anchor="middle" font-size="7.5" fill="#24405e">HyDE</text><text x="81" y="64" text-anchor="middle">draft a fake answer, embed it</text>
  <rect x="164" y="42" width="150" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="239" y="54" text-anchor="middle" font-size="7.5" fill="#24405e">multi-query</text><text x="239" y="64" text-anchor="middle">3 phrasings → merge results</text>
</svg>

- **Rewrite** — an LLM rewrites the raw query into a clean, standalone one (resolving "it", "that", fixing typos, adding conversation context).
- **Decompose** — split a multi-part question ("compare A and B on price and speed") into sub-questions, retrieve for each.
- **HyDE (Hypothetical Document Embeddings)** — have the LLM *write a hypothetical answer*, then embed **that** to search — because an answer looks more like the target documents than the question does.
- **Multi-query** — generate several phrasings, retrieve for all, merge (with RRF).

:::warn
Every rewrite adds an LLM call — more latency, more cost, and a new failure point: a bad rewrite retrieves worse than the original. Rewriting also can **drift** from user intent, quietly answering a different question. Add these only where retrieval measurably fails, and keep the original query in the mix as a fallback.
:::
