## OCR and document understanding

- **OCR** (optical character recognition) turns pixels of text into machine-readable characters. **Document understanding** goes further: it reads the *structure* — which text is a heading, a table cell, a total, a signature.
- Classic OCR is two stages: **detect** where the text is (boxes around words or lines), then **recognise** the characters inside each box.
- Document understanding adds **layout**: it combines the text, its position on the page, and the visual style so it can answer "what is the invoice total?" not just "what words are present".

<svg viewBox="0 0 330 96" role="img" aria-label="A scanned document with text lines detected as boxes, then parsed into structured fields like total equals 42 dollars" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="15" y="16" width="80" height="64" fill="#f4f7fb" stroke="#c9d6e5"/>
  <g stroke="#24405e" fill="none"><rect x="24" y="24" width="55" height="8"/><rect x="24" y="40" width="45" height="7"/><rect x="24" y="56" width="60" height="7"/></g>
  <path d="M104 48 L140 48" stroke="#1a1a1a" marker-end="url(#oc)"/><text x="122" y="42" text-anchor="middle" fill="#6b6b6b">read</text>
  <rect x="150" y="20" width="165" height="56" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="160" y="38">vendor: Acme Ltd</text><text x="160" y="52">date: 2026-09-29</text><text x="160" y="66" font-weight="bold">total: $42.00</text>
  <defs><marker id="oc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Vision-language models increasingly do this end to end: feed the page image and ask in plain language for the fields. It is simpler than a detect-then-recognise-then-parse pipeline — but for high-stakes documents, verify the numbers, since a VLM can misread a digit and state it with full confidence.
:::
