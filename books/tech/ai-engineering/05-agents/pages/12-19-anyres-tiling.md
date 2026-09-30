## AnyRes tiling

- **AnyRes** (LLaVA-NeXT and many others) keeps the frozen 336 px encoder and feeds it a high-res image by **cutting the image into a grid of 336 px tiles**, encoding each tile separately, then concatenating all their tokens.
- It also encodes one **downsized whole image** for global context, so the model sees both the forest (the thumbnail) and the trees (the tiles).

<svg viewBox="0 0 360 116" role="img" aria-label="A high resolution image is split into a grid of tiles plus a global thumbnail, each encoded and their tokens concatenated" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="16" width="72" height="72" rx="2" fill="#fff" stroke="#24405e"/><g stroke="#24405e" stroke-dasharray="2,1"><line x1="46" y1="16" x2="46" y2="88"/><line x1="10" y1="52" x2="82" y2="52"/></g><text x="46" y="102" text-anchor="middle" font-size="6" fill="#6b6b6b">2×2 tiles + global</text>
  <text x="96" y="54" font-size="7">→</text>
  <g fill="#6a9bd0"><rect x="112" y="24" width="30" height="24" rx="2"/><rect x="146" y="24" width="30" height="24" rx="2"/><rect x="112" y="52" width="30" height="24" rx="2"/><rect x="146" y="52" width="30" height="24" rx="2"/></g>
  <rect x="182" y="38" width="30" height="24" rx="2" fill="#9ac0e6"/><text x="197" y="53" text-anchor="middle" font-size="5">global</text>
  <text x="146" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">5 encoder passes</text>
  <text x="228" y="54" font-size="7">→</text>
  <rect x="244" y="34" width="108" height="30" rx="3" fill="#a03050"/><text x="298" y="50" text-anchor="middle" fill="#fff" font-size="6">576 × 5 ≈ 2,880 tokens</text><text x="298" y="60" text-anchor="middle" fill="#fc8" font-size="5.5">concatenated</text>
</svg>

- A 672×672 image → a 2×2 grid → 4 tiles + 1 global = **5 encoder passes** → ~2,880 visual tokens. The encoder never changes; you just call it more times and glue the results.
- **Adaptive grids:** the model picks a tile layout matching the aspect ratio (a wide banner → 3×1, a document → 2×3), so tall or wide images are not squashed.

:::warn
AnyRes trades cost for detail linearly-times-a-constant, and that constant bites. A single high-res image can become **thousands** of tokens — a 4×4 grid is 17 passes and ~9,800 tokens. Multi-image or video prompts blow the context window fast. Production VLMs cap the tile count and often **pool** tokens afterward (later page) to keep the bill sane.
:::
