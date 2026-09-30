## Why not just flatten the image?

- The obvious idea: unroll the image grid into one long vector and feed it to an MLP. It works badly, for two reasons.
- **Too many weights.** A 224×224 colour image is 150,528 numbers. One fully-connected layer of 1,000 neurons then needs 150 million weights — for a single layer. It will overfit and barely fit in memory.
- **It throws away structure.** Flattening scatters neighbouring pixels far apart in the vector. The network has to relearn that they were ever adjacent.

<svg viewBox="0 0 340 110" role="img" aria-label="A 2D image grid unrolled into a long thin 1D strip, with an arrow noting that neighbouring pixels end up far apart" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g stroke="#24405e" fill="#e8f4fd"><rect x="20" y="20" width="20" height="20"/><rect x="40" y="20" width="20" height="20"/><rect x="60" y="20" width="20" height="20"/><rect x="20" y="40" width="20" height="20"/><rect x="40" y="40" width="20" height="20"/><rect x="60" y="40" width="20" height="20"/></g>
  <path d="M90 40 L130 40" stroke="#1a1a1a" marker-end="url(#fl)"/><text x="110" y="30" text-anchor="middle" fill="#6b6b6b">flatten</text>
  <g stroke="#24405e" fill="#e8f4fd"><rect x="140" y="30" width="16" height="16"/><rect x="156" y="30" width="16" height="16"/><rect x="172" y="30" width="16" height="16"/><rect x="188" y="30" width="16" height="16"/><rect x="204" y="30" width="16" height="16"/><rect x="220" y="30" width="16" height="16"/></g>
  <text x="188" y="70" text-anchor="middle" fill="#c0392b">pixels once stacked are now far apart</text>
  <defs><marker id="fl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
The fix is the **convolution**: a tiny weight grid that slides across the image, reusing the same weights everywhere. It keeps neighbours together and cuts the weight count by thousands. That is the next page — and the heart of computer vision.
:::
