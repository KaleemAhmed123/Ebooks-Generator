## Residuals and layer normalization

- Stacking dozens of attention and FFN blocks would be untrainable without two pieces of glue: **residual connections** and **layer normalization**. They are why a 100-layer transformer trains at all.

### Residual connections

- A **residual** (or skip) connection adds a block's input back to its output: `output = x + Block(x)`.
- This gives the gradient a clean highway straight back to the input (Booklet 2's ResNet idea, page 04-09 there). Without it, gradients vanish through deep stacks and early layers never learn.

### Layer normalization

- **LayerNorm** rescales each token's vector to zero mean and unit variance, keeping activations in a stable range as they flow through many layers. It steadies training and lets you use higher learning rates.

<svg viewBox="0 0 360 76" role="img" aria-label="Input flows through a block and is added back via a skip connection, then normalized" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="30" width="30" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="29" y="42" text-anchor="middle" font-size="7">x</text>
  <rect x="90" y="28" width="60" height="20" rx="3" fill="#24405e"/><text x="120" y="42" text-anchor="middle" fill="#fff">block</text>
  <path d="M44 38 L88 38" stroke="#1a1a1a" marker-end="url(#rn)"/>
  <circle cx="180" cy="38" r="9" fill="#c0392b"/><text x="180" y="42" text-anchor="middle" fill="#fff">+</text>
  <path d="M150 38 L169 38" stroke="#1a1a1a" marker-end="url(#rn)"/>
  <path d="M29 46 Q29 68 100 68 T180 47" fill="none" stroke="#1a3a2a" marker-end="url(#rn2)"/><text x="110" y="64" text-anchor="middle" font-size="7" fill="#1a3a2a">skip (add input back)</text>
  <path d="M190 38 L224 38" stroke="#1a1a1a" marker-end="url(#rn)"/>
  <rect x="228" y="28" width="70" height="20" rx="3" fill="#6a9bd0"/><text x="263" y="42" text-anchor="middle" fill="#fff">LayerNorm</text>
  <defs><marker id="rn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="rn2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

:::note
The 2017 paper put LayerNorm *after* the residual add ("post-norm"). Nearly every model since ~2020 puts it *before* the block ("pre-norm", `x + Block(LN(x))`) because it trains far more stably at depth. Many 2026 LLMs also swap LayerNorm for **RMSNorm**, a cheaper variant that skips the mean-centering. Small placements, large effect: get the norm wrong and a deep transformer diverges.
:::
