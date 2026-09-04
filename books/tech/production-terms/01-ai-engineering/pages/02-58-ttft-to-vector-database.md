## TTFT

*time to first token*

The interval between sending a request and the first token coming back. It
splits into queueing for capacity, prefill — the model reading your entire
prompt — and the first decode step.

Prefill usually dominates, and it scales with input length. That is the
counterintuitive part: a longer prompt makes the *start* slower, quite
separately from making the answer longer. Doubling your retrieved context can
double the silence before anything appears.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A request timeline showing queueing then prefill then the first decode step, with prefill occupying most of the interval before the first token">
  <rect x="4" y="20" width="46" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="27" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">queue</text>
  <rect x="50" y="20" width="230" height="24" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="165" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">prefill — scales with prompt length</text>
  <rect x="280" y="20" width="52" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="306" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">decode</text>
  <path d="M4 54 H332" stroke="#1a1a1a" stroke-width="1.2"/><path d="M332 54 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="338" y="38" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">first token</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the user is staring at nothing for this whole bar</text>
</svg>

**If TTFT is the problem, look at prompt size before anything else.** Five
well-reranked chunks instead of forty cuts prefill directly, and it is almost
always cheaper than moving to a faster model.

## Vector Database

A store holding embeddings next to the payload they came from, answering
nearest-neighbour queries rather than exact-match lookups. It is what a
retrieval pipeline queries and what an index rebuild rebuilds.

Three parts do the work: the vectors, the metadata you filter on, and the
approximate index that keeps search sublinear. Dimension limits usually belong
to the index, not the column — pgvector 0.8 stores a `vector` of up to 16,000
dimensions but will only build an HNSW or IVFFlat index over the first 2,000.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rows of id, vector and metadata, with the approximate index built only over the vector column and the metadata used for filtering">
  <rect x="4" y="18" width="46" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="27" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">id</text>
  <rect x="52" y="18" width="150" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="127" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">vector[1536]</text>
  <rect x="204" y="18" width="150" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="279" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">tenant, doc_id, text</text>
  <rect x="4" y="38" width="46" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="52" y="38" width="150" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <rect x="204" y="38" width="150" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M127 56 V68" stroke="#1a1a1a" stroke-width="1.2"/><path d="M127 70 l-4 -7 h8 z" fill="#1a1a1a"/>
  <text x="136" y="72" font-family="Consolas,monospace" font-size="8" fill="#c25a35">ANN index</text>
  <text x="279" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">filters, not searched by similarity</text>
</svg>

**The index is a rebuildable derivative; the source text is not.** Losing an
index costs a rebuild. Losing chunk text and boundaries means re-embedding the
whole corpus, which is the expensive half of the job.
