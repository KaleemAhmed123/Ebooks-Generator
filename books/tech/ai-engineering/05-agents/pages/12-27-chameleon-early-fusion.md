## Chameleon: mixed-modal from scratch

- **Chameleon** (Meta, 2024) is the reference early-fusion model: one transformer trained from scratch on **interleaved** text and image tokens, able to read and generate both in any order within a single sequence.
- Because everything is one token stream, Chameleon can produce a reply that *mixes* text and images natively — a paragraph, then a generated diagram, then more text — without switching models or calling an image tool.

<svg viewBox="0 0 360 78" role="img" aria-label="A single Chameleon sequence interleaves text and image tokens and outputs both" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g font-size="6"><rect x="10" y="28" width="34" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="27" y="40" text-anchor="middle">text</text>
  <rect x="46" y="28" width="34" height="18" rx="2" fill="#a03050"/><text x="63" y="40" text-anchor="middle" fill="#fff">img</text>
  <rect x="82" y="28" width="34" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="99" y="40" text-anchor="middle">text</text>
  <rect x="118" y="28" width="34" height="18" rx="2" fill="#a03050"/><text x="135" y="40" text-anchor="middle" fill="#fff">img</text></g>
  <text x="80" y="60" text-anchor="middle" font-size="6" fill="#6b6b6b">one interleaved sequence</text>
  <rect x="180" y="24" width="60" height="26" rx="3" fill="#24405e"/><text x="210" y="40" text-anchor="middle" fill="#fff" font-size="6.5">one model</text>
  <text x="255" y="30" font-size="6" fill="#1a3a2a">→ generates text</text><text x="255" y="42" font-size="6" fill="#1a3a2a">→ generates images</text><text x="255" y="54" font-size="6" fill="#6b6b6b">in one pass</text>
  <path d="M152 37 L178 37" stroke="#888" marker-end="url(#ch)"/>
  <defs><marker id="ch" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The hard part is stability.** Mixing two modalities with wildly different statistics into one softmax makes training diverge. Chameleon's fixes — **QK-Norm** (normalize queries and keys before attention) and careful layer-norm placement — are its real contribution: recipes that keep an early-fusion model from blowing up.
- On pure understanding it trails the best projector VLMs; its point is *architecture*, showing a single from-scratch model can do genuinely mixed-modal I/O.

:::interview
"What is the catch with early-fusion multimodal models?"

Two catches. Training instability — one shared softmax over very different token distributions diverges without tricks like QK-Norm. And perception detail — VQ tokenization rounds patches to a codebook, so fine reading (documents, small text) lags projector VLMs that pass continuous features. Early fusion buys unified generation and elegance at the cost of harder training and coarser sight.
:::
