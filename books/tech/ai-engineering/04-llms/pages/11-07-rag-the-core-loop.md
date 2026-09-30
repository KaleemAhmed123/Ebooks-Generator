## RAG: the core loop

- **Retrieval-augmented generation (RAG)** fixes the LLM's two biggest limits — stale knowledge and hallucination — by **fetching relevant documents and putting them in the prompt**, so the model answers from real text instead of memory.
- Two phases. **Indexing** happens once, offline. **Retrieval + generation** happens per query.

<svg viewBox="0 0 336 100" role="img" aria-label="Indexing: documents are chunked and embedded into a vector store. Query time: the question is embedded, nearest chunks retrieved, and passed with the question to the LLM" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="10" y="12" fill="#6b6b6b">INDEX (once)</text>
  <rect x="10" y="16" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="33" y="27" text-anchor="middle">docs</text>
  <rect x="70" y="16" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="93" y="27" text-anchor="middle">chunk</text>
  <rect x="130" y="16" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="153" y="27" text-anchor="middle">embed</text>
  <rect x="190" y="16" width="60" height="16" rx="2" fill="#24405e"/><text x="220" y="27" text-anchor="middle" fill="#fff">vector store</text>
  <path d="M56 24 L68 24" stroke="#1a1a1a" marker-end="url(#g)"/><path d="M116 24 L128 24" stroke="#1a1a1a" marker-end="url(#g)"/><path d="M176 24 L188 24" stroke="#1a1a1a" marker-end="url(#g)"/>
  <text x="10" y="54" fill="#6b6b6b">QUERY (each time)</text>
  <rect x="10" y="58" width="52" height="16" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="36" y="69" text-anchor="middle">question</text>
  <rect x="78" y="58" width="60" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="108" y="69" text-anchor="middle">retrieve top-k</text>
  <rect x="154" y="58" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="189" y="69" text-anchor="middle">question+chunks</text>
  <rect x="240" y="58" width="40" height="16" rx="2" fill="#24405e"/><text x="260" y="69" text-anchor="middle" fill="#fff">LLM</text>
  <rect x="292" y="58" width="40" height="16" rx="2" fill="#1a3a2a"/><text x="312" y="69" text-anchor="middle" fill="#fff">answer</text>
  <path d="M62 66 L76 66" stroke="#1a1a1a" marker-end="url(#g)"/><path d="M138 66 L152 66" stroke="#1a1a1a" marker-end="url(#g)"/><path d="M224 66 L238 66" stroke="#1a1a1a" marker-end="url(#g)"/><path d="M280 66 L290 66" stroke="#1a1a1a" marker-end="url(#g)"/>
  <path d="M220 32 C220 44, 108 46, 108 56" stroke="#bbb" fill="none" marker-end="url(#g)"/>
  <defs><marker id="g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Index**: split documents into **chunks**, embed each (page 11-06), store the vectors. **Query**: embed the question, retrieve the top-k nearest chunks, and hand them to the LLM with an instruction like "answer using only the context below."
- RAG gives the model **fresh, private, citable** knowledge without retraining — update the answer by updating the documents.

:::warn
RAG is only as good as retrieval. If the right chunk is not in the top-k, the model answers from memory or makes something up — and it does so **confidently**, because it cannot tell that retrieval failed. Most "RAG doesn't work" complaints are retrieval-quality problems, which the next pages (chunking, hybrid search, re-ranking) exist to fix.
:::
