## The Q-Former, step by step

- The Q-Former's trick is a fixed set of **learned query vectors** — typically **32** of them. They are not derived from the image; they are trainable parameters, the same 32 for every image. Think of them as 32 standing questions the model learned to ask of any picture.

<svg viewBox="0 0 360 110" role="img" aria-label="Thirty-two learned queries cross-attend to image patches and emit thirty-two visual tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="45" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">257 patch features</text>
  <g fill="#6a9bd0"><rect x="14" y="20" width="10" height="10"/><rect x="26" y="20" width="10" height="10"/><rect x="38" y="20" width="10" height="10"/><rect x="50" y="20" width="10" height="10"/><rect x="62" y="20" width="10" height="10"/><rect x="74" y="20" width="10" height="10"/></g>
  <text x="45" y="96" text-anchor="middle" font-size="6" fill="#a03050">32 learned queries</text>
  <g fill="#a03050"><rect x="20" y="66" width="12" height="12" rx="2"/><rect x="36" y="66" width="12" height="12" rx="2"/><rect x="52" y="66" width="12" height="12" rx="2"/></g>
  <rect x="150" y="34" width="80" height="42" rx="4" fill="#24405e"/><text x="190" y="52" text-anchor="middle" fill="#fff" font-size="7">cross-</text><text x="190" y="64" text-anchor="middle" fill="#fff" font-size="7">attention</text>
  <path d="M84 26 L148 44" stroke="#6a9bd0" marker-end="url(#qf)"/><path d="M64 70 L148 62" stroke="#a03050" marker-end="url(#qf2)"/>
  <path d="M230 55 L268 55" stroke="#888" marker-end="url(#qf)"/>
  <g fill="#1a3a2a"><rect x="274" y="42" width="12" height="12" rx="2"/><rect x="290" y="42" width="12" height="12" rx="2"/><rect x="306" y="42" width="12" height="12" rx="2"/></g>
  <text x="300" y="72" text-anchor="middle" font-size="6" fill="#1a3a2a">32 visual tokens</text>
  <defs><marker id="qf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6a9bd0"/></marker><marker id="qf2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **The mechanism:** the 32 queries **cross-attend** to the ~257 image patch features (cross-attention = queries come from one set, keys/values from another). Each query pulls a weighted summary of the patches it cares about. Out come exactly **32 visual tokens**, no matter the image size.
- A linear layer then reshapes those 32 tokens to the LLM's embedding width, and they are prepended to the text prompt. The frozen LLM sees 32 extra "words" describing the image.

:::interview
**"Why 32 queries and not one vector, or all 257 patches?"** One vector is a single global summary — too lossy for questions about parts of the scene. All 257 patches is faithful but expensive and, in BLIP-2, would overwhelm a frozen LLM never trained on that many visual tokens. 32 is the compromise: enough slots to cover distinct regions, few enough to stay cheap. The number is a **detail-vs-cost dial**, and later VLMs turned it up.
:::
