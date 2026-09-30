## Vision transformers

- A **vision transformer (ViT)** drops the convolution entirely. It cuts the image into small square **patches**, treats each patch like a word, and feeds the sequence to a transformer (Booklet 3).
- Each patch is flattened and projected into a vector (a patch embedding). Attention then lets every patch look at every other patch directly — a global view from layer one, which a CNN reaches only after many layers.
- Given enough data, ViTs match or beat CNNs on classification and scale better to huge models.

<svg viewBox="0 0 330 110" role="img" aria-label="An image split into a grid of patches, each patch turned into a token, the tokens fed into a transformer block" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g stroke="#24405e" fill="#e8f4fd"><rect x="15" y="25" width="22" height="22"/><rect x="37" y="25" width="22" height="22"/><rect x="59" y="25" width="22" height="22"/><rect x="15" y="47" width="22" height="22"/><rect x="37" y="47" width="22" height="22"/><rect x="59" y="47" width="22" height="22"/></g>
  <text x="48" y="88" text-anchor="middle" fill="#6b6b6b">patches</text>
  <path d="M88 47 L120 47" stroke="#1a1a1a" marker-end="url(#vt)"/>
  <g fill="#3d6ea5"><rect x="126" y="30" width="14" height="14"/><rect x="144" y="30" width="14" height="14"/><rect x="162" y="30" width="14" height="14"/><rect x="180" y="30" width="14" height="14"/></g>
  <text x="160" y="60" text-anchor="middle" fill="#6b6b6b">patch tokens</text>
  <path d="M202 40 L232 40" stroke="#1a1a1a" marker-end="url(#vt)"/>
  <rect x="236" y="24" width="84" height="34" rx="3" fill="#1a3a2a"/><text x="278" y="45" text-anchor="middle" fill="#fff">transformer</text>
  <defs><marker id="vt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
ViTs are data-hungry. A CNN's built-in assumption that nearby pixels relate (its **inductive bias**) gives it a head start on small datasets; a ViT has no such bias and must learn everything from data. On a small dataset a CNN still wins — reach for ViT when you have a lot of data or a pretrained one to fine-tune.
:::
