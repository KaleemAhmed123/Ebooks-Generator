## ColPali: vision-native retrieval

- RAG (Booklet 4) retrieves relevant pages before answering. The standard pipeline for PDFs is brutal: OCR each page → chunk the text → embed → search. Every stage loses something — OCR mangles tables, chunking severs layout, and figures/charts vanish entirely because they are not text.
- **ColPali** (2024) throws the pipeline out. It **embeds the page image directly** with a VLM (built on PaliGemma) — no OCR, no chunking. The page's text, tables, and figures are all retrievable because the model *sees* them. **[VERIFY]**

<svg viewBox="0 0 360 96" role="img" aria-label="ColPali embeds page images with a VLM using multi-vector late interaction instead of OCR and text chunking" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="24" width="52" height="44" rx="2" fill="#fff" stroke="#24405e"/><g stroke="#bbb"><line x1="16" y1="34" x2="56" y2="34"/><line x1="16" y1="42" x2="56" y2="42"/><rect x="16" y="48" width="18" height="14" fill="#d5e8fb" stroke="none"/></g><text x="36" y="78" text-anchor="middle" font-size="5.5" fill="#6b6b6b">page image</text>
  <rect x="80" y="30" width="56" height="32" rx="3" fill="#a03050"/><text x="108" y="46" text-anchor="middle" fill="#fff" font-size="6">VLM</text><text x="108" y="56" text-anchor="middle" fill="#fc8" font-size="5">per-patch vecs</text>
  <g fill="#6a9bd0"><rect x="152" y="30" width="10" height="10"/><rect x="152" y="42" width="10" height="10"/><rect x="152" y="54" width="10" height="10"/></g><text x="157" y="78" text-anchor="middle" font-size="5.5" fill="#6b6b6b">multi-vector</text>
  <rect x="196" y="36" width="60" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="226" y="49" text-anchor="middle" font-size="6">query</text>
  <text x="280" y="44" font-size="6" fill="#1a3a2a">late interaction:</text><text x="280" y="55" font-size="6" fill="#1a3a2a">match query tokens</text><text x="280" y="66" font-size="6" fill="#1a3a2a">to page patches</text>
  <path d="M62 46 L78 46" stroke="#888" marker-end="url(#cp)"/><path d="M136 46 L150 46" stroke="#888" marker-end="url(#cp)"/>
  <defs><marker id="cp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Multi-vector late interaction (ColBERT-style).** Instead of one embedding per page, ColPali keeps *many* — one per patch. At search time each query word is matched to its best-matching page patch and the scores summed (MaxSim). This finds the page where a specific term or figure lives, not just the vaguely-relevant page.
- **The trade:** many vectors per page means a bigger index and heavier scoring than single-vector search — you buy dramatically better retrieval on visual documents with storage and compute.

:::interview
"How would you build RAG over a folder of scanned PDFs with charts?"

The strong 2026 answer is vision-native: embed page images with a ColPali-style model using multi-vector late interaction, skipping OCR and chunking entirely, so charts and tables are retrievable. Then feed the top pages (as images) to a document VLM to answer. It beats OCR-then-text-RAG on anything visual, at the cost of a larger multi-vector index.
:::
