## VLM: multimodal RAG

- Text RAG (Flagship 3) retrieves text for a text question. **Multimodal RAG** retrieves and reasons over *images* too — answer a question by finding the relevant chart, diagram, or scanned page, not just text chunks. Two architectures, from the VLM you built.

<svg viewBox="0 0 360 88" role="img" aria-label="Two multimodal RAG designs: caption-then-text-search, versus native visual embedding search with ColPali" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="16" width="164" height="30" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="94" y="28" text-anchor="middle" font-size="6">A: caption → text search</text><text x="94" y="39" text-anchor="middle" font-size="5.5">VLM describes images, embed the text</text>
  <rect x="184" y="16" width="164" height="30" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="266" y="28" text-anchor="middle" font-size="6">B: native visual embedding</text><text x="266" y="39" text-anchor="middle" font-size="5.5">embed page images directly (ColPali)</text>
  <text x="180" y="62" text-anchor="middle" font-size="6">retrieve → feed image(s) + question to the VLM → grounded answer</text>
  <text x="180" y="78" text-anchor="middle" font-size="5.5" fill="#6b6b6b">A loses visual detail in the caption · B preserves it, needs a visual index</text>
</svg>

- **Design A — caption-then-retrieve.** Run each image through the VLM to produce a text description at ingest, embed those descriptions, and do normal text RAG. Simple and reuses your text pipeline — but the caption is a lossy summary, so detail the caption omitted is unretrievable.
- **Design B — native visual retrieval (ColPali, Booklet 5).** Embed the *page images themselves* into a visual index and retrieve by visual-semantic similarity, skipping the lossy caption. Preserves layout, charts, and fine detail — the right choice for document-heavy corpora — at the cost of a specialised visual index.
- **Both end the same way:** retrieve the relevant image(s), feed them *plus* the question to the VLM (Flagship 6), and generate a grounded answer citing the source page.

:::interview
"How do you do RAG over documents that are mostly charts and scanned pages?"

Don't flatten them to lossy text captions if detail matters — use **native visual retrieval**. Embed the page images directly (ColPali-style) into a visual index and retrieve by visual-semantic similarity, then feed the retrieved page images plus the question to a VLM for a grounded answer. The simpler alternative — caption each image with a VLM at ingest and do text RAG — works when a summary suffices, but loses whatever the caption omitted (specific chart values, layout, small text). So: caption-then-text-RAG for image-light corpora, native visual RAG (ColPali) for document/chart-heavy ones. Matching the retrieval modality to where the information actually lives is the answer.
:::
