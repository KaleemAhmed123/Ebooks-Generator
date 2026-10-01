## Flagship 6: document-QA VLM — spec

- **Goal:** build a vision-language model that answers questions about images and documents — patchify the image, encode it, project it into the LLM's token space, and fuse. Booklet 5 covered VLM *architectures*; this builds the core, self-contained, in code.
- **The four steps**, each runnable:

<svg viewBox="0 0 360 90" role="img" aria-label="VLM pipeline: image to patches, vision encoder (ViT), projection to token space, fused with text into the LLM" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="36" width="46" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="33" y="47" text-anchor="middle">image</text>
  <rect x="66" y="36" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="92" y="44" text-anchor="middle" font-size="6">patchify</text><text x="92" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">ViT encode</text>
  <rect x="128" y="36" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="154" y="44" text-anchor="middle" font-size="6">projector</text><text x="154" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">→ token space</text>
  <rect x="190" y="26" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="210" y="37" text-anchor="middle" font-size="6">text</text>
  <rect x="240" y="30" width="52" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="266" y="44" text-anchor="middle">LLM</text>
  <rect x="302" y="36" width="48" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="326" y="47" text-anchor="middle" font-size="6">answer</text>
  <path d="M56 45 L64 45" stroke="#888" marker-end="url(#vl)"/><path d="M118 45 L126 45" stroke="#888" marker-end="url(#vl)"/><path d="M180 45 L238 42" stroke="#888" marker-end="url(#vl)"/><path d="M230 34 L238 38" stroke="#888" marker-end="url(#vl)"/><path d="M292 45 L300 45" stroke="#888" marker-end="url(#vl)"/>
  <defs><marker id="vl" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The core idea (Booklet 5):** an image becomes a sequence of *visual tokens* that live in the same space as text tokens, so the LLM attends over image and text together. The **projector** is the bridge that maps vision-encoder features into the LLM's embedding dimension — the LLaVA design, the simplest and most common.
- **Why document-QA specifically:** documents (forms, tables, charts) are the highest-value VLM use and stress the *resolution* problem (Booklet 5) — small text needs many patches, which is where VLM serving cost blows up (17-28b).

:::note
This flagship makes concrete the fusion taxonomy from Booklet 5: you are building the **projector** family (map patches to tokens, prepend to input) because it is the best default — simplest to train, keeps visual detail, needs only a small bridge trained. Seeing it in code demystifies "multimodal": there is no magic, just a vision encoder, a linear-ish projector, and the *same* LLM attending over a longer token sequence that happens to start with image tokens.
:::
