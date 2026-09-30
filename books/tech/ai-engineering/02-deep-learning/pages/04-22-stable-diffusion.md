## Stable Diffusion

- Running diffusion on full-resolution pixels is brutally expensive. **Stable Diffusion** (2022) made it practical with one move: do the diffusion in a small **latent** space, not on pixels.
- A pretrained autoencoder compresses a 512×512 image into a tiny grid (e.g. 64×64) that keeps the meaning. Diffusion runs there — dozens of times cheaper — then the decoder expands the result back to full pixels.
- This is a **latent diffusion model**. It is why image generation could run on a single consumer GPU instead of a data centre.

<svg viewBox="0 0 340 100" role="img" aria-label="An encoder shrinks the image to a small latent grid, diffusion runs in that small space, then a decoder expands back to a full image" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="28" width="40" height="44" fill="#24405e"/><text x="32" y="84" text-anchor="middle" fill="#6b6b6b">image</text>
  <path d="M54 50 L78 50" stroke="#1a1a1a" marker-end="url(#sd)"/><text x="66" y="44" text-anchor="middle" fill="#6b6b6b">enc</text>
  <rect x="82" y="40" width="20" height="20" fill="#3d6ea5"/>
  <rect x="118" y="36" width="90" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="163" y="54" text-anchor="middle">diffusion (latent)</text>
  <rect x="224" y="40" width="20" height="20" fill="#3d6ea5"/>
  <path d="M248 50 L272 50" stroke="#1a1a1a" marker-end="url(#sd)"/><text x="260" y="44" text-anchor="middle" fill="#6b6b6b">dec</text>
  <rect x="276" y="28" width="40" height="44" fill="#1a3a2a"/><text x="296" y="84" text-anchor="middle" fill="#6b6b6b">output</text>
  <defs><marker id="sd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
The latent trick is the same lesson as pooling and patches: work at the smallest representation that still holds the meaning. Text ("a fox in snow") conditions the latent diffusion through cross-attention to a CLIP embedding, so the prompt shapes every denoising step.
:::
