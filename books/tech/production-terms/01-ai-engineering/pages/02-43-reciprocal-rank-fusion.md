## Reciprocal Rank Fusion

*RRF*

Merging ranked lists by position instead of by score. Two retrievers produce
incomparable numbers — BM25 has no fixed ceiling, cosine similarity runs roughly
−1 to 1 — so adding them lets whichever produces larger values dominate the
merge regardless of how confident it was.

RRF discards the scores. Each list contributes `1 / (k + rank)` for a document,
with ranks starting at 1, and the contributions are summed. Documents ranked
well by both lists rise; a retriever's claimed confidence is irrelevant.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two ranked lists from different retrievers are merged into one fused list by summing one over k plus rank, so a document ranked well by both rises to the top">
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">BM25</text>
  <rect x="4" y="20" width="96" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="32" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">1. doc-3</text>
  <rect x="4" y="38" width="96" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="50" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">2. doc-7</text>

  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">vector</text>
  <rect x="4" y="74" width="96" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="86" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">1. doc-7</text>

  <path d="M100 30 H150 V50" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M100 82 H150 V56" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M152 52 H184" stroke="#1a1a1a" stroke-width="1.2"/><path d="M186 52 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="106" y="46" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">sum 1/(60+rank)</text>

  <rect x="188" y="30" width="140" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="196" y="43" font-family="Consolas,monospace" font-size="8" fill="#c25a35">1. doc-7  (both lists)</text>
  <rect x="188" y="52" width="140" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="196" y="65" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">2. doc-3  (one list)</text>
  <text x="338" y="52" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">no normalisation,</text>
  <text x="338" y="65" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">no tuning</text>
</svg>

**The constant is what stops one retriever's first result winning outright.**
Elasticsearch defaults `rank_constant` to 60; raising it gives lower-ranked
documents more influence. To favour one retriever, weight the lists — do not
reach back for score normalisation, which is the problem RRF exists to avoid.
