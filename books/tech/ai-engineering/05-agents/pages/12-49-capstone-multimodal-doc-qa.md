## Capstone: a multimodal document-QA agent

- Assemble the module into one system: a user drops a folder of PDFs (text, tables, charts, scans) and asks questions; the system answers with citations. Every earlier page has a job here.

<svg viewBox="0 0 360 122" role="img" aria-label="End to end: pages embedded by ColPali, retrieved, read by a document VLM, answered with citations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="28" text-anchor="middle" font-size="6">PDF pages</text>
  <rect x="8" y="44" width="60" height="22" rx="3" fill="#a03050"/><text x="38" y="58" text-anchor="middle" fill="#fff" font-size="6">ColPali embed</text>
  <rect x="8" y="74" width="60" height="22" rx="3" fill="#f4f4f4" stroke="#888"/><text x="38" y="88" text-anchor="middle" font-size="6">index</text>
  <rect x="120" y="44" width="66" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="153" y="59" text-anchor="middle" font-size="6">retrieve top-k</text>
  <rect x="214" y="42" width="66" height="28" rx="3" fill="#24405e"/><text x="247" y="54" text-anchor="middle" fill="#fff" font-size="6">doc VLM</text><text x="247" y="64" text-anchor="middle" fill="#cdd" font-size="5">reads pages</text>
  <rect x="300" y="42" width="54" height="28" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="327" y="54" text-anchor="middle" font-size="6">answer</text><text x="327" y="64" text-anchor="middle" font-size="5">+ page cite</text>
  <path d="M68 55 L118 55" stroke="#888" marker-end="url(#ca)"/><path d="M186 55 L212 55" stroke="#888" marker-end="url(#ca)"/><path d="M280 56 L298 56" stroke="#888" marker-end="url(#ca)"/>
  <text x="180" y="112" text-anchor="middle" font-size="6" fill="#6b6b6b">query → retrieve pages as images → VLM answers over pixels → cite the page</text>
  <defs><marker id="ca" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

1. **Ingest.** Render each PDF page to an image. Embed with a **ColPali-style** model (12-42) — no OCR, so charts and tables survive. Store the multi-vector index.
2. **Retrieve.** For a query, late-interaction search returns the top-k *page images* most likely to hold the answer.
3. **Read.** Feed those pages (as images, at high resolution) to a **document VLM** (12-41) with the question. Ask for **structured output** with a **page citation**.
4. **Verify.** For high-stakes fields, re-read the cited page to confirm the value (guard against hallucination, 12-47). Cap visual tokens for cost (12-48).

- **Why this design:** it keeps the modality alive end to end (retrieve on pixels, answer on pixels), so nothing is lost to a lossy OCR/caption step. It is the multimodal-RAG lesson (12-43) made concrete.

:::note
This capstone is a full agent in miniature — perception (VLM), retrieval (a tool), a verification gate, and a cost budget. Swap the document VLM for a computer-use model and the pages for screenshots, and you have a browser agent. The rest of this booklet is this same shape, generalized: a model that perceives, tools it can call, a loop, and guardrails.
:::
