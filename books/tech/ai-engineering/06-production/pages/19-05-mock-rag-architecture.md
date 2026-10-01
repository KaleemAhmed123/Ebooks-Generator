## Mock: production RAG — architecture

- **Prompt:** "Design a production assistant that answers from a company's documents." **Clarify:** 50k employees, ~500k docs updated daily, answers must be **grounded and cited**, 2 s response acceptable, medium accuracy stakes (wrong answer is costly, not catastrophic), data stays in the VPC.

<svg viewBox="0 0 360 108" role="img" aria-label="RAG architecture: ingestion pipeline building a vector index, and a query path with hybrid retrieval, rerank, and a grounded generator" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="80" y="12" text-anchor="middle" font-size="6.5" fill="#8a6d3b">ingestion (batch)</text>
  <rect x="12" y="18" width="44" height="14" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="34" y="28" text-anchor="middle">docs</text>
  <rect x="62" y="18" width="44" height="14" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="84" y="28" text-anchor="middle">chunk+embed</text>
  <rect x="112" y="18" width="44" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="134" y="28" text-anchor="middle">vector DB</text>
  <path d="M56 25 L60 25" stroke="#888" marker-end="url(#r1)"/><path d="M106 25 L110 25" stroke="#888" marker-end="url(#r1)"/>
  <text x="200" y="52" text-anchor="middle" font-size="6.5" fill="#24405e">query path</text>
  <rect x="12" y="58" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="32" y="69" text-anchor="middle">query</text>
  <rect x="60" y="58" width="60" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="90" y="66" text-anchor="middle" font-size="6">hybrid retrieve</text><text x="90" y="73" text-anchor="middle" font-size="5" fill="#6b6b6b">BM25+dense</text>
  <rect x="128" y="58" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="151" y="69" text-anchor="middle">rerank</text>
  <rect x="182" y="58" width="60" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="212" y="66" text-anchor="middle" font-size="6">generate</text><text x="212" y="73" text-anchor="middle" font-size="5" fill="#6b6b6b">+ citations</text>
  <rect x="250" y="58" width="60" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="280" y="69" text-anchor="middle" font-size="6">groundedness chk</text>
  <path d="M52 66 L58 66" stroke="#888" marker-end="url(#r1)"/><path d="M120 66 L126 66" stroke="#888" marker-end="url(#r1)"/><path d="M174 66 L180 66" stroke="#888" marker-end="url(#r1)"/><path d="M242 66 L248 66" stroke="#888" marker-end="url(#r1)"/>
  <path d="M134 32 L110 57" stroke="#888" stroke-dasharray="2 2" marker-end="url(#r1)"/>
  <defs><marker id="r1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Two pipelines, cleanly split.** *Ingestion* (batch, off the hot path): chunk documents, embed them (17-28a serving), upsert into the vector DB, re-run on the daily delta. *Query* (hot path): **hybrid retrieval** (BM25 keyword + dense vector, Booklet 4) → **cross-encoder rerank** the top-k → **generate with citations** → a **groundedness check** that the answer is supported by the retrieved text.
- **Grounding is the whole product.** The requirement was "grounded and cited," so retrieval quality — not model size — is the lever, and a post-generation groundedness check is a first-class component, not an add-on.

:::note
The senior instinct on any RAG design is to **separate ingestion from query** immediately and put ingestion on the batch tier — it has utterly different economics (embedding is prefill-only and latency-insensitive, 17-28a) and a different failure model (a stale index, not a slow query). Drawing them as one pipeline is the junior tell. The other tell: reaching for a bigger model when the requirement ("grounded, cited") is really asking for better *retrieval*.
:::
