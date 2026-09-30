## Pooling and stride

- Feature maps must shrink as the network deepens — otherwise memory and compute explode. Two tools shrink them.
- **Stride** — how far the kernel jumps between positions. Stride 2 skips every other spot, halving the output's height and width in one move.
- **Pooling** — a fixed shrink with no weights. **Max pooling** takes the largest value in each small window, keeping the strongest response and discarding the rest.

<svg viewBox="0 0 320 120" role="img" aria-label="A 4 by 4 grid reduced to 2 by 2 by max pooling, each output cell taking the maximum of a 2 by 2 window" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g stroke="#24405e" fill="#e8f4fd"><rect x="20" y="20" width="24" height="24"/><rect x="44" y="20" width="24" height="24"/><rect x="68" y="20" width="24" height="24"/><rect x="92" y="20" width="24" height="24"/><rect x="20" y="44" width="24" height="24"/><rect x="44" y="44" width="24" height="24"/><rect x="68" y="44" width="24" height="24"/><rect x="92" y="44" width="24" height="24"/></g>
  <g fill="#1a1a1a"><text x="28" y="36">1</text><text x="52" y="36">3</text><text x="28" y="60">2</text><text x="52" y="60">0</text></g>
  <text x="76" y="48" fill="#6b6b6b">…</text>
  <path d="M126 44 L165 44" stroke="#1a1a1a" marker-end="url(#pl)"/><text x="145" y="36" text-anchor="middle" fill="#6b6b6b">max 2×2</text>
  <g stroke="#1a3a2a" fill="#eafaf0"><rect x="175" y="20" width="30" height="30"/><rect x="205" y="20" width="30" height="30"/><rect x="175" y="50" width="30" height="30"/><rect x="205" y="50" width="30" height="30"/></g>
  <text x="187" y="40">3</text>
  <text x="255" y="52" fill="#6b6b6b">half the size</text>
  <defs><marker id="pl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Shrinking the map also grows the **receptive field**: after pooling, each value summarises a larger patch of the original image. Detail is traded for a wider view.

:::note
Modern architectures increasingly favour **strided convolutions** over separate pooling layers — the shrink is then learnable rather than fixed. Both reach the same goal: fewer, more meaningful values as you go deeper.
:::
