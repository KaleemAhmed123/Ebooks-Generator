## How the contrastive loss works

- "Contrastive" means learning by comparison: pull matched pairs together, push mismatched pairs apart. Here is the exact mechanism, because interviewers ask for it.

### One training step, worked
- Take a batch of **N = 4** image-caption pairs. Encode all 4 images and all 4 captions. Compute the **4×4 similarity matrix** — every image against every caption (cosine similarity, scaled by a learned temperature).

<svg viewBox="0 0 360 118" role="img" aria-label="A 4 by 4 similarity matrix where the diagonal are correct pairs and off-diagonal are wrong" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="20" y="12" font-size="6" fill="#6b6b6b">captions →</text>
  <g font-size="6" fill="#6b6b6b"><text x="8" y="40">img₁</text><text x="8" y="60">img₂</text><text x="8" y="80">img₃</text><text x="8" y="100">img₄</text></g>
  <g stroke="#fff" stroke-width="1.5">
   <rect x="40" y="30" width="24" height="16" fill="#1a3a2a"/><rect x="66" y="30" width="24" height="16" fill="#dde"/><rect x="92" y="30" width="24" height="16" fill="#dde"/><rect x="118" y="30" width="24" height="16" fill="#dde"/>
   <rect x="40" y="50" width="24" height="16" fill="#dde"/><rect x="66" y="50" width="24" height="16" fill="#1a3a2a"/><rect x="92" y="50" width="24" height="16" fill="#dde"/><rect x="118" y="50" width="24" height="16" fill="#dde"/>
   <rect x="40" y="70" width="24" height="16" fill="#dde"/><rect x="66" y="70" width="24" height="16" fill="#dde"/><rect x="92" y="70" width="24" height="16" fill="#1a3a2a"/><rect x="118" y="70" width="24" height="16" fill="#dde"/>
   <rect x="40" y="90" width="24" height="16" fill="#dde"/><rect x="66" y="90" width="24" height="16" fill="#dde"/><rect x="92" y="90" width="24" height="16" fill="#dde"/><rect x="118" y="90" width="24" height="16" fill="#1a3a2a"/></g>
  <text x="160" y="52" font-size="7" fill="#1a3a2a">■ diagonal = correct pair</text><text x="160" y="70" font-size="7" fill="#6b6b6b">□ off-diagonal = wrong pair</text>
  <text x="160" y="92" font-size="7">loss pushes each row + column</text><text x="160" y="104" font-size="7">to peak on its diagonal cell.</text>
</svg>

- **The loss:** treat each row as a 4-way classification (which caption matches this image?) and each column likewise (which image matches this caption?). Cross-entropy on both, averaged. This is **InfoNCE** / symmetric cross-entropy.
- The N−1 off-diagonal cells in each row are **negatives** — free, because they are just the other captions in the batch. That is why CLIP needs enormous batch sizes (32k+): more negatives per step, sharper the space.

:::interview
**"Why does CLIP train with such huge batches?"** Because the negatives are the other samples *in the batch*. A batch of 4 gives 3 negatives per image; a batch of 32,768 gives 32,767. The quality of a contrastive embedding scales with the number of negatives it must push away each step, so batch size is not a tuning detail here — it is the core knob on representation quality.
:::
