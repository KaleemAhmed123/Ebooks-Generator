## Question answering

- **Question answering (QA)** returns an answer to a natural-language question. Two shapes, and the difference decides how much a system can hallucinate.
- **Extractive QA** — given a question *and* a passage, mark the exact span of the passage that answers it. The answer is always a substring of the source. This is what the SQuAD benchmark trained a generation of models on.
- **Generative (open-book) QA** — the model writes the answer in its own words, optionally after retrieving relevant documents.

<svg viewBox="0 0 370 76" role="img" aria-label="A question and passage feed a model that marks the answer span inside the passage" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="14" width="120" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="72" y="27" text-anchor="middle">Q: when was Apple founded?</text>
  <rect x="12" y="40" width="120" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="72" y="52" text-anchor="middle">passage: "...founded in</text><text x="72" y="62" text-anchor="middle"><tspan fill="#c0392b">1976</tspan> by Jobs and..."</text>
  <path d="M136 40 L176 40" stroke="#1a1a1a" marker-end="url(#q)"/>
  <rect x="180" y="30" width="60" height="22" rx="3" fill="#24405e"/><text x="210" y="44" text-anchor="middle" fill="#fff">model</text>
  <path d="M242 41 L282 41" stroke="#1a1a1a" marker-end="url(#q)"/>
  <rect x="286" y="30" width="70" height="22" rx="3" fill="#1a3a2a"/><text x="321" y="44" text-anchor="middle" fill="#fff">span: "1976"</text>
  <defs><marker id="q" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Extractive QA is the safer building block: if the answer must be a span of a trusted source, the model cannot fabricate it — at worst it points at the wrong span. This "answer must come from the provided text" constraint is the seed of **retrieval-augmented generation (RAG)** — retrieve trusted passages, then answer only from them — the technique Booklet 4 builds in full. Closed-book QA, where the model answers from memory alone, is where hallucination lives.
:::
