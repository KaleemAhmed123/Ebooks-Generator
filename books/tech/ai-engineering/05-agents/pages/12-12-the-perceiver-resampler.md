## The Perceiver Resampler

- A video is many frames; each frame is hundreds of patches. Feeding all of it to Flamingo's cross-attention layers would be ruinous. Flamingo first shrinks the visual stream through a **Perceiver Resampler**.
- Same core trick as the Q-Former: a fixed set of **learned latent vectors** (Flamingo uses **64**) cross-attend to *whatever* number of visual features come in — 1 image or 30 video frames — and emit a **fixed 64 tokens** every time.

<svg viewBox="0 0 360 96" role="img" aria-label="A variable number of frame features is resampled to a fixed 64 tokens by learned latents" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">variable input</text>
  <g fill="#6a9bd0"><rect x="14" y="20" width="9" height="9"/><rect x="25" y="20" width="9" height="9"/><rect x="36" y="20" width="9" height="9"/><rect x="47" y="20" width="9" height="9"/><rect x="14" y="31" width="9" height="9"/><rect x="25" y="31" width="9" height="9"/><rect x="36" y="31" width="9" height="9"/><rect x="47" y="31" width="9" height="9"/><rect x="14" y="42" width="9" height="9"/><rect x="25" y="42" width="9" height="9"/><rect x="36" y="42" width="9" height="9"/><rect x="47" y="42" width="9" height="9"/></g>
  <text x="60" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">(1 image … many frames)</text>
  <rect x="140" y="24" width="80" height="30" rx="4" fill="#24405e"/><text x="180" y="38" text-anchor="middle" fill="#fff" font-size="6.5">resampler</text><text x="180" y="49" text-anchor="middle" fill="#fc8" font-size="6">64 latents</text>
  <path d="M60 38 L138 38" stroke="#888" marker-end="url(#pr)"/><path d="M220 38 L258 38" stroke="#888" marker-end="url(#pr)"/>
  <g fill="#1a3a2a"><rect x="266" y="28" width="10" height="10" rx="2"/><rect x="280" y="28" width="10" height="10" rx="2"/><rect x="294" y="28" width="10" height="10" rx="2"/><rect x="308" y="28" width="10" height="10" rx="2"/></g>
  <text x="300" y="52" text-anchor="middle" font-size="6" fill="#1a3a2a">always 64 tokens</text>
  <defs><marker id="pr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The payoff: everything downstream sees a **constant** visual sequence length, so the LLM's compute does not blow up on long video. Cost decouples from input size.
- The same **"learned latents resample variable input to fixed output"** pattern is everywhere in multimodal AI — the Perceiver (its origin), the Q-Former, and the token-pooling layers in modern video VLMs. Learn it once.

:::interview
"How do VLMs stop video from exploding the token count?"

They resample. A fixed bank of learned queries/latents cross-attends to however many frame features arrive and emits a constant number of tokens. Cost is then set by the number of latents you chose, not by how long the video is — at the price of detail lost in the squeeze.
:::
