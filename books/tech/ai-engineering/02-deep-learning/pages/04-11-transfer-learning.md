## Transfer learning

- **Transfer learning** reuses a model already trained on a huge dataset, then adapts it to your smaller task. It is how vision gets done in practice.
- The insight: the early layers of an ImageNet model already detect edges, textures, and shapes — features useful for *any* image task. Only the final head is task-specific.
- So you keep the pretrained feature extractor and train a fresh head on your data. You need far less data and far less time.

<svg viewBox="0 0 350 96" role="img" aria-label="A pretrained backbone is frozen while only a new small head is trained on the new task" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="20" y="30" width="180" height="40" rx="3" fill="#cfe0f0" stroke="#24405e"/><text x="110" y="48" text-anchor="middle">pretrained backbone</text><text x="110" y="62" text-anchor="middle" fill="#6b6b6b">frozen — reused as-is</text>
  <path d="M202 50 L228 50" stroke="#1a1a1a" marker-end="url(#tl)"/>
  <rect x="230" y="30" width="100" height="40" rx="3" fill="#1a3a2a"/><text x="280" y="48" text-anchor="middle" fill="#fff">new head</text><text x="280" y="62" text-anchor="middle" fill="#cfe0d5">trained on your data</text>
  <defs><marker id="tl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Two modes: **feature extraction** freezes the backbone and trains only the head; **fine-tuning** then unfreezes the top layers and trains them gently at a low learning rate.

:::warn
When fine-tuning, use a **small** learning rate. The backbone's weights are already good; a large step wipes out what it learned — called catastrophic forgetting. And always fine-tune *after* the new head has warmed up, or the head's random early gradients corrupt the backbone.
:::
