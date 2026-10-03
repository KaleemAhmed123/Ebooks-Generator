## Emu3: next-token prediction for everything

- **Emu3** (BAAI, 2024) pushes early fusion to its logical end: **one objective, next-token prediction, over text, images, and video** — no diffusion, no CLIP, no separate generation head.
- Everything is tokenized to discrete IDs (text by BPE, image/video by a VQ tokenizer), concatenated, and the model just predicts the next ID. Generation is autoregressive sampling; understanding is reading. The same loop that writes a sentence paints an image, one patch-token at a time.

<svg viewBox="0 0 360 84" role="img" aria-label="Emu3 uses one next-token loss over text, image and video tokens for both understanding and generation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="18" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="30" text-anchor="middle" font-size="6">text IDs</text>
  <rect x="10" y="38" width="70" height="16" rx="2" fill="#a03050"/><text x="45" y="50" text-anchor="middle" fill="#fff" font-size="6">image IDs</text>
  <rect x="10" y="58" width="70" height="16" rx="2" fill="#7a4a2a"/><text x="45" y="70" text-anchor="middle" fill="#fff" font-size="6">video IDs</text>
  <rect x="130" y="30" width="90" height="32" rx="4" fill="#24405e"/><text x="175" y="43" text-anchor="middle" fill="#fff" font-size="6.5">predict next ID</text><text x="175" y="55" text-anchor="middle" fill="#cdd" font-size="5.5">one loss</text>
  <rect x="266" y="26" width="86" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="309" y="38" text-anchor="middle" font-size="6">generate image</text>
  <rect x="266" y="48" width="86" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="309" y="60" text-anchor="middle" font-size="6">or answer text</text>
  <path d="M80 46 L128 46" stroke="#888" marker-end="url(#em)"/><path d="M220 46 L264 40" stroke="#888" marker-end="url(#em)"/><path d="M220 48 L264 56" stroke="#888" marker-end="url(#em)"/>
  <defs><marker id="em" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Emu3's claim: you do **not** need diffusion for strong image generation; a big enough autoregressive transformer over VQ tokens competes with diffusion models, while also doing understanding, in one architecture.
- The tension it exposes: autoregressive image generation is **slow** (thousands of tokens generated one by one) and VQ still caps fidelity. That tension is exactly what the *hybrid* models on the next pages try to resolve.

:::note
Emu3 and Chameleon frame the central 2024–2026 question in generative multimodal AI: can one pure next-token model do everything, or do images want a fundamentally different generator (diffusion)? Emu3 votes "one model, one loss." Transfusion, next, votes "one model, two losses." Watch which the frontier converges on.
:::
