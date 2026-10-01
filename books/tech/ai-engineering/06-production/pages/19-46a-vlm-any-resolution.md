## VLM: handling high resolution

- The fixed 224×224 patchify of 19-46 is fine for a photo, useless for a document — small text and dense charts need far more pixels than 196 patches can capture. **Any-resolution** techniques (Booklet 5) let a VLM see fine detail without a fixed-resolution straitjacket.

<svg viewBox="0 0 360 82" role="img" aria-label="A high-res document image is tiled into sub-images, each patchified, plus a downscaled global view" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="16" width="60" height="56" rx="2" fill="#f4f4f4" stroke="#888"/><text x="44" y="46" text-anchor="middle" font-size="5.5">hi-res doc</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="100" y="16" width="28" height="26"/><rect x="130" y="16" width="28" height="26"/><rect x="100" y="44" width="28" height="26"/><rect x="130" y="44" width="28" height="26"/></g>
  <text x="129" y="80" text-anchor="middle" font-size="5" fill="#6b6b6b">tiles (each patchified)</text>
  <rect x="180" y="30" width="40" height="30" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="200" y="47" text-anchor="middle" font-size="5">global thumb</text>
  <rect x="248" y="34" width="46" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="47" text-anchor="middle" font-size="5.5">all tokens → LLM</text>
  <path d="M74 44 L98 40 M158 44 L178 45 M220 45 L246 45" stroke="#888" marker-end="url(#vr)"/>
  <defs><marker id="vr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Tiling (AnyRes).** Split a high-res image into tiles, patchify each at the encoder's native resolution, and *also* include a downscaled global view — so the model sees fine local detail (the tiles) *and* overall layout (the thumbnail). A one-megapixel page becomes many tiles' worth of tokens instead of a blurry 196.
- **The cost is the token explosion** (17-28b). More tiles = more visual tokens = a longer, pricier, slower prefill. So resolution is a *budget*: give a dense document enough tiles to read its text, but not so many that prefill dominates. Adaptive schemes (patch-n-pack/NaViT) pack variable resolutions efficiently to control this.

:::interview
"Your document-QA VLM can't read small text. What do you change?"

It's resolution-starved, not capability-starved — 196 patches over a full page blurs small text. Switch to **any-resolution tiling**: split the page into tiles, patchify each at native resolution, and add a global thumbnail so the model gets both fine detail and layout. That makes the text legible — at the cost of a **token explosion** in prefill (each tile adds visual tokens), so I'd set a *resolution budget*: enough tiles for the text to be readable, capped so prefill (and cost/latency, 17-28b) stays bounded, and use efficient packing (patch-n-pack) to get more resolution per token. The diagnosis — "small-text failure is a resolution/patch-count decision, not a bigger-model problem" — is the signal.
:::
