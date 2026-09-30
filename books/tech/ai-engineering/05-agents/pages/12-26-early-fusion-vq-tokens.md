## Early fusion: pixels as tokens

- Every model so far keeps a *seam*: a vision encoder on one side, an LLM on the other, a bridge between. **Early fusion** removes the seam. Turn the image into **discrete tokens from a fixed vocabulary**, exactly like text, and train one transformer over the mixed stream from scratch.
- The enabling tool is a **VQ tokenizer** (Vector Quantization, from VQ-VAE / VQGAN, Booklet 2): an autoencoder whose middle layer snaps each image patch to the nearest entry in a learned **codebook** of, say, 8,192 visual "words." An image becomes a grid of codebook indices — integers, just like text token IDs.

<svg viewBox="0 0 360 100" role="img" aria-label="A VQ tokenizer maps image patches to codebook indices that join text tokens in one vocabulary" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="30" width="50" height="38" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="35" y="52" text-anchor="middle" font-size="6">image</text>
  <rect x="80" y="32" width="56" height="34" rx="3" fill="#a03050"/><text x="108" y="46" text-anchor="middle" fill="#fff" font-size="6">VQ enc</text><text x="108" y="57" text-anchor="middle" fill="#fc8" font-size="5.5">→ codebook</text>
  <rect x="156" y="34" width="90" height="30" rx="3" fill="#f4f4f4" stroke="#888"/><text x="201" y="52" text-anchor="middle" font-size="6">[513, 22, 7, 902…]</text>
  <rect x="266" y="30" width="86" height="38" rx="3" fill="#24405e"/><text x="309" y="46" text-anchor="middle" fill="#fff" font-size="6">one transformer</text><text x="309" y="58" text-anchor="middle" fill="#cdd" font-size="5.5">text + image IDs</text>
  <path d="M60 49 L78 49" stroke="#888" marker-end="url(#ef)"/><path d="M136 49 L154 49" stroke="#888" marker-end="url(#ef)"/><path d="M246 49 L264 49" stroke="#888" marker-end="url(#ef)"/>
  <text x="180" y="92" text-anchor="middle" font-size="6" fill="#6b6b6b">image IDs and text IDs share one vocabulary and one next-token loss</text>
  <defs><marker id="ef" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Now text token IDs and image token IDs live in **one vocabulary**. The transformer predicts the next token whether it is a word or a patch. **Understanding** (image in, text out) and **generation** (text in, image tokens out → decode to pixels) become the *same* operation.
- The price: VQ discretization throws away detail (a patch is rounded to the nearest codebook entry), so early-fusion models historically lag projector VLMs on fine perception — an active research gap.

:::note
Early fusion is the elegant end of the spectrum: no encoder, no projector, no cross-attention — one model, one loss, any modality. Its bet is that a single unified token stream, trained at scale, beats a stack of specialized bridges. Chameleon and Emu3 (next pages) are the flag-bearers.
:::
