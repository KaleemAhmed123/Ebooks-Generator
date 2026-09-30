## The fusion problem

- You have an LLM that reasons over text tokens and a vision encoder that emits image features. They speak different languages, in different vector spaces, at different sequence lengths. **Fusion** is the art of making them one model.
- Three constraints pull against each other, and every VLM design is a point in this tug-of-war:

<svg viewBox="0 0 360 100" role="img" aria-label="Fusion trades off preserving detail, keeping token count low, and reusing frozen pretrained weights" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <path d="M180 14 L330 90 L30 90 Z" fill="none" stroke="#24405e" stroke-width="1"/>
  <text x="180" y="10" text-anchor="middle" font-size="7">keep detail</text>
  <text x="24" y="98" font-size="7">few tokens</text>
  <text x="300" y="98" font-size="7">reuse frozen weights</text>
  <text x="180" y="58" text-anchor="middle" font-size="6" fill="#6b6b6b">pick two;</text>
  <text x="180" y="70" text-anchor="middle" font-size="6" fill="#6b6b6b">the design is where you sit</text>
</svg>

- **Keep detail:** pass the LLM every patch so nothing is lost. But 196+ visual tokens per image bloats the sequence and the cost.
- **Few tokens:** compress the image to a handful of tokens (cheap, fast) — but you throw away fine detail.
- **Reuse frozen weights:** freeze the pretrained vision encoder and LLM and train only a small bridge (cheap to train, keeps both models' abilities) — but a frozen LLM never truly learns to *see*, capping how deeply it fuses.

- The next pages walk the four canonical answers in order of how deeply they fuse: **projector** (LLaVA, shallow, keep detail), **query bottleneck** (BLIP-2, compress hard), **cross-attention** (Flamingo, inject deep), **shared tokens** (Chameleon, no seam at all).

:::note
There is no "best" fusion. A cheap chat-about-a-photo product wants few tokens and frozen weights. A document-reading product wants every patch. A frontier lab training from scratch wants shared tokens. The interview answer is always "it depends on detail needs, budget, and whether you can afford to train from scratch."
:::
