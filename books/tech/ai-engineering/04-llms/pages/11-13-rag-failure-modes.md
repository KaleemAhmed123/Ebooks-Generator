## RAG failure modes

- RAG breaks in predictable places. Knowing the failure map turns "it gave a wrong answer" into "stage 3 failed" — and each stage has a known fix.

<svg viewBox="0 0 330 82" role="img" aria-label="Failure points along the RAG pipeline: chunking, retrieval, ranking, and generation each have a characteristic failure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="30" width="66" height="20" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="39" y="43" text-anchor="middle">chunk</text>
  <rect x="86" y="30" width="66" height="20" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="119" y="43" text-anchor="middle">retrieve</text>
  <rect x="166" y="30" width="66" height="20" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="199" y="43" text-anchor="middle">rank</text>
  <rect x="246" y="30" width="78" height="20" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="285" y="43" text-anchor="middle">generate</text>
  <path d="M72 40 L84 40" stroke="#1a1a1a" marker-end="url(#fm)"/><path d="M152 40 L164 40" stroke="#1a1a1a" marker-end="url(#fm)"/><path d="M232 40 L244 40" stroke="#1a1a1a" marker-end="url(#fm)"/>
  <text x="39" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">split mid-idea</text>
  <text x="119" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">wrong / missing</text>
  <text x="199" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">right chunk buried</text>
  <text x="285" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">ignores context</text>
  <defs><marker id="fm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Chunking** — chunks too big dilute relevance; too small cut an idea in half. Fix: overlap chunks, split on structure (headings, paragraphs), keep a chunk ≈ one coherent thought.
- **Retrieval miss** — the answer is not in the top-k. Fix: hybrid search (11-09), query rewriting (11-11).
- **Ranking** — the right chunk was retrieved but ranked low and dropped. Fix: re-ranking (11-10).
- **Generation** — the model ignores the context or blends it with memory. Fix: a stricter prompt ("answer *only* from the context; if absent, say you don't know") and faithfulness checks (11-12).

:::note
**Say "I don't know."** The single most valuable behaviour is refusing to answer when retrieval returns nothing relevant. Instruct and test for it explicitly — a system that admits ignorance beats one that confidently invents, especially in medicine, law, and finance.
:::

:::warn
The most dangerous failure is **plausible and wrong**: retrieval returns a *related-but-incorrect* chunk, and the model produces a confident, well-cited answer built on it. This passes a casual eye and fails the user. Only per-stage evaluation with a golden set (11-12) catches it before production does.
:::
