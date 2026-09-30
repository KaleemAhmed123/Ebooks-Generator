## Multimodal and cross-modal RAG

- **Multimodal RAG** retrieves across modalities: the knowledge base holds text, images, tables, and charts, and any of them can be the answer. **Cross-modal** means the query and the result are *different* modalities — text query → image result, or image query → text result.
- Two architectures, and the choice matters. **[VERIFY]**

<svg viewBox="0 0 360 100" role="img" aria-label="Shared embedding space retrieval versus caption-everything-into-text retrieval" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6" fill="#24405e">A · shared space (CLIP)</text>
  <rect x="20" y="22" width="40" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="33" text-anchor="middle" font-size="5.5">text q</text>
  <rect x="120" y="22" width="40" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="140" y="33" text-anchor="middle" font-size="5.5">image</text>
  <circle cx="90" cy="56" r="16" fill="none" stroke="#bbb" stroke-dasharray="2,2"/><text x="90" y="58" text-anchor="middle" font-size="5">one space</text>
  <path d="M40 38 L80 50" stroke="#888" marker-end="url(#mr)"/><path d="M140 38 L100 50" stroke="#888" marker-end="url(#mr)"/>
  <line x1="185" y1="16" x2="185" y2="92" stroke="#eee"/>
  <text x="275" y="14" text-anchor="middle" font-size="6" fill="#24405e">B · caption-to-text</text>
  <rect x="210" y="26" width="44" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="232" y="37" text-anchor="middle" font-size="5.5">image</text>
  <rect x="270" y="26" width="44" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="292" y="37" text-anchor="middle" font-size="5.5">→ caption</text>
  <rect x="240" y="58" width="80" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="280" y="69" text-anchor="middle" font-size="5.5">text index (search)</text>
  <path d="M254 34 L268 34" stroke="#888" marker-end="url(#mr)"/>
  <defs><marker id="mr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **A — shared embedding space.** Use a CLIP-style model to embed text and images into *one* space, then nearest-neighbor across everything. A text query finds matching images directly. Elegant, truly cross-modal, but limited by CLIP's weak fine detail.
- **B — caption everything into text.** Run a VLM to caption/describe every image and table, then do ordinary text RAG over the descriptions. Simple, reuses your text stack, and the LLM answers over rich descriptions — but a caption is lossy, and you retrieve the *description*, not the pixels.
- **Best of both (common in 2026):** ColPali-style visual retrieval to *find* the page, then hand the actual **image** to a VLM to answer — retrieval keeps pixels, generation sees pixels.

:::note
The recurring failure of multimodal RAG is answering over a lossy proxy. If you caption an image to a sentence and retrieve on that, you have thrown the image away before the question is asked. Keep the modality alive as far down the pipeline as you can — retrieve on the image, answer on the image — and only collapse to text when a task genuinely needs it.
:::
