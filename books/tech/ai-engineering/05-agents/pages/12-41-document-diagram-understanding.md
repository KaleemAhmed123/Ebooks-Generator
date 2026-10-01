## Document and diagram understanding

- The highest-value VLM task in business is reading **documents** — invoices, forms, contracts, reports, slides — and **diagrams** — charts, tables, flowcharts, schematics. It is also where generic VLMs are weakest, because it demands exactly what CLIP is bad at: fine text and precise layout.
- Two things separate a document VLM from a photo VLM:
  - **Resolution.** Small text needs many patches. Document VLMs run high-res tiling or native-resolution encoders (Qwen-VL, InternVL) — resolution is the whole game (12-18).
  - **Layout awareness.** A table is meaningless without knowing which cell is under which header; a form needs the label-to-value pairing. The model must encode 2-D position, not just read left to right.

<svg viewBox="0 0 360 92" role="img" aria-label="A VLM reads a document by combining high resolution with layout so it maps values to headers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="16" width="96" height="62" rx="2" fill="#fff" stroke="#24405e"/><g font-size="5" fill="#333"><text x="20" y="28">Invoice #4471</text><text x="20" y="42">Item      Qty  Price</text><line x1="20" y1="46" x2="100" y2="46" stroke="#bbb"/><text x="20" y="56">Widget    3    $12</text><text x="20" y="66">Total          $36</text></g>
  <text x="130" y="48" font-size="7">→</text>
  <rect x="150" y="24" width="70" height="44" rx="4" fill="#24405e"/><text x="185" y="42" text-anchor="middle" fill="#fff" font-size="6">VLM</text><text x="185" y="55" text-anchor="middle" fill="#cdd" font-size="5">hi-res+layout</text>
  <rect x="240" y="24" width="110" height="44" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="295" y="40" text-anchor="middle" font-size="6">{"total": 36,</text><text x="295" y="52" text-anchor="middle" font-size="6"> "invoice": 4471}</text>
</svg>

- **OCR-free is the trend.** Older pipelines ran OCR (optical character recognition — a separate model that extracts text) then fed the text to an LLM. Modern document VLMs skip OCR and read the pixels directly, which keeps layout, handles handwriting and stamps, and avoids OCR's cascading errors.
- **Structured output** closes the loop: ask for JSON (Booklet 4's constrained decoding) so the answer is machine-usable — `{"total": 36}`, not a sentence.

:::interview
"OCR-then-LLM vs a document VLM — which and why?"

OCR-then-LLM is a two-stage pipeline: any OCR error (a misread digit, a scrambled table) propagates and the LLM never sees the layout. A document VLM reads pixels end to end, preserving spatial structure and handling stamps, handwriting, and complex tables OCR mangles. The tradeoff: OCR is cheaper per page and its text output is auditable; VLMs cost more tokens but are more robust on messy real documents.
:::
