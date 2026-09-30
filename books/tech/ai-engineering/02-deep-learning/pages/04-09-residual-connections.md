## Residual connections

- A **residual connection** (or skip connection) adds a layer's input to its output: `out = layer(x) + x`. The signal gets a shortcut around the layer.
- This is why very deep networks train. The gradient flows back through the `+ x` shortcut untouched, so it never vanishes over a long stack.
- It also changes what a layer must learn. Instead of reproducing the whole signal, the layer only learns the **residual** — the small change to add. Learning "adjust a little" is easier than learning "rebuild everything".

<svg viewBox="0 0 340 110" role="img" aria-label="Input x flows through two weight layers and is also added directly to their output via a skip connection before the final activation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="20" y="60">x</text>
  <rect x="70" y="20" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="105" y="37" text-anchor="middle">weight</text>
  <rect x="160" y="20" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="195" y="37" text-anchor="middle">weight</text>
  <circle cx="270" cy="55" r="12" fill="#1a3a2a"/><text x="270" y="59" text-anchor="middle" fill="#fff">+</text>
  <g stroke="#1a1a1a"><path d="M32 55 L68 33" marker-end="url(#rc)"/><path d="M140 33 L158 33" marker-end="url(#rc)"/><path d="M230 33 L258 48" marker-end="url(#rc)"/></g>
  <path d="M40 60 C120 100 220 100 262 66" stroke="#c0392b" fill="none" marker-end="url(#rd)"/>
  <text x="150" y="98" text-anchor="middle" fill="#c0392b">skip: identity shortcut</text>
  <path d="M282 55 L320 55" stroke="#1a1a1a" marker-end="url(#rc)"/>
  <defs><marker id="rc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="rd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::note
Residual connections are the single most reused idea in modern deep learning. Transformers (Booklet 3) put one around every attention and every feed-forward block. If you remember one architectural trick from this module, remember `+ x`.
:::
