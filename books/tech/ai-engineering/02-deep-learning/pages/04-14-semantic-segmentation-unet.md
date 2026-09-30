## Semantic segmentation: U-Net

- **Semantic segmentation** labels *every pixel* with a class: this pixel is road, that one is car, that one is sky. The output is a full-resolution map, not a box.
- The challenge: a CNN shrinks the image to understand it, but segmentation needs a full-size output. **U-Net** solves this with two halves — shrink then grow.
- The **encoder** downsamples to capture meaning; the **decoder** upsamples back to full resolution. **Skip connections** carry fine detail from encoder to decoder so edges stay sharp.

<svg viewBox="0 0 340 120" role="img" aria-label="U-Net: an encoder path narrowing down and a decoder path widening back up, joined by horizontal skip connections, forming a U shape" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#24405e"><rect x="20" y="20" width="18" height="50"/><rect x="46" y="30" width="16" height="34"/><rect x="70" y="40" width="14" height="20"/></g>
  <rect x="94" y="48" width="20" height="14" fill="#6b6b6b"/>
  <g fill="#1a3a2a"><rect x="124" y="40" width="14" height="20"/><rect x="148" y="30" width="16" height="34"/><rect x="174" y="20" width="18" height="50"/></g>
  <g stroke="#c0392b" stroke-dasharray="3 2"><path d="M38 30 L124 45"/><path d="M62 38 L148 42"/></g>
  <text x="45" y="88" fill="#6b6b6b">encoder ↓</text><text x="150" y="88" fill="#6b6b6b">decoder ↑</text>
  <text x="90" y="105" text-anchor="middle" fill="#c0392b">red = skip connections carry detail across</text>
</svg>

- Skip connections here play the same role as in ResNet, for a different reason: they reunite the *where* (early, detailed) with the *what* (deep, abstract).

:::note
U-Net was built for medical imaging and still dominates it. The same encoder–decoder-with-skips shape reappears far beyond segmentation — it is the backbone of the diffusion image generators later in this module.
:::
