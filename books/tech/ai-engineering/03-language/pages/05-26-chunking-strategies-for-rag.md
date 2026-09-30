## Chunking for retrieval

- An embedding model turns *one* piece of text into *one* vector. A 50-page document is too big for a single vector to represent well — so you cut it into **chunks** first, embed each chunk, and retrieve chunks.
- **Chunking is the highest-leverage, most-overlooked decision in retrieval.** Bad chunks mean the right answer is split across two vectors and neither ranks well.

### The main strategies

- **Fixed-size.** Every N tokens (say 512), with an **overlap** (say 50 tokens) so a sentence cut at a boundary still appears whole in one chunk. Simple, strong default.
- **Structural.** Split on the document's own seams — paragraphs, headings, Markdown sections, code functions. Keeps semantically whole units together.
- **Semantic.** Start a new chunk when the topic shifts (detected by a drop in sentence-to-sentence embedding similarity). Best quality, most compute.

<svg viewBox="0 0 360 66" role="img" aria-label="A long document cut into overlapping chunks, each embedded to its own vector" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="24" width="200" height="20" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="112" y="18" text-anchor="middle" fill="#6b6b6b">long document</text>
  <rect x="14" y="26" width="70" height="16" fill="#24405e" fill-opacity="0.25" stroke="#24405e"/>
  <rect x="74" y="26" width="70" height="16" fill="#1a3a2a" fill-opacity="0.25" stroke="#1a3a2a"/>
  <rect x="134" y="26" width="70" height="16" fill="#c0392b" fill-opacity="0.2" stroke="#c0392b"/>
  <text x="79" y="54" font-size="6" fill="#6b6b6b">overlap</text>
  <path d="M214 34 L250 34" stroke="#1a1a1a" marker-end="url(#ch)"/>
  <text x="305" y="30" text-anchor="middle">one vector</text><text x="305" y="42" text-anchor="middle">per chunk</text>
  <defs><marker id="ch" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
The two errors that kill retrieval. **Chunks too large** — the vector averages several topics into a blur that matches nothing sharply. **Chunks too small** — a chunk loses the context that made it meaningful ("it raised prices" — *what* raised prices?). There is no universal size; it depends on your documents and must be **measured** on real queries. Booklet 4 builds the full RAG pipeline that consumes these chunks.
:::
