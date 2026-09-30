## Serving embedding models

- Not every model generates text. **Embedding models** turn text into a vector — the backbone of RAG retrieval (Booklet 4) — and serving them is a *different* workload with different economics, worth its own capacity plan.
- The key difference: **embedding is prefill-only.** There is no autoregressive decode loop — one forward pass reads the input and emits a single vector. So it is entirely compute-bound, batches beautifully, and has no KV-cache-per-token growth.

<svg viewBox="0 0 360 76" role="img" aria-label="An embedding model does one prefill pass over a batch of texts and outputs one vector each, with no decode loop" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888"><rect x="14" y="20" width="46" height="12" rx="2"/><rect x="14" y="36" width="46" height="12" rx="2"/><rect x="14" y="52" width="46" height="12" rx="2"/></g><text x="37" y="14" text-anchor="middle" font-size="5.5" fill="#6b6b6b">batch of texts</text>
  <rect x="96" y="26" width="80" height="30" rx="3" fill="#24405e"/><text x="136" y="44" text-anchor="middle" font-size="6" fill="#fff">one prefill pass</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="212" y="22" width="46" height="10" rx="2"/><rect x="212" y="38" width="46" height="10" rx="2"/><rect x="212" y="54" width="46" height="10" rx="2"/></g><text x="235" y="16" text-anchor="middle" font-size="5.5" fill="#6b6b6b">one vector each</text>
  <text x="310" y="44" text-anchor="middle" font-size="6" fill="#6b6b6b">no decode, no KV growth</text>
  <path d="M60 40 L94 40" stroke="#888" marker-end="url(#em)"/><path d="M176 40 L210 40" stroke="#888" marker-end="url(#em)"/>
  <defs><marker id="em" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The consequences for serving.** Throughput is very high (small models, one pass, huge batches), latency is low and predictable, and cost per item is tiny — so you serve embeddings on far cheaper hardware than a generative model, or as a managed API line item. Ingestion (embedding a whole corpus) is the classic **batch-tier** job.
- **Rerankers are the cousin.** A cross-encoder reranker (Booklet 4) also does prefill-only scoring of (query, doc) pairs — same shape, but it runs at query time on the top-k candidates, so it is latency-sensitive where corpus embedding is not.

:::note
Interviewers testing RAG designs listen for whether you treat the embedding model as a *separate service* with its own scaling, not an afterthought bolted to the LLM. It has opposite economics — prefill-only, batches hugely, cheap — so it deserves its own (small) GPU pool or API budget, and its ingestion runs on the batch tier. Conflating it with the generative serving plan is a common oversight.
:::
