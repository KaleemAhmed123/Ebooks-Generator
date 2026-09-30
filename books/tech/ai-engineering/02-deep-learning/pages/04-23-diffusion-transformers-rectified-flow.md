## Diffusion transformers and rectified flow

- Two upgrades define the current top image generators (as of September 2026): a transformer backbone and a straighter path from noise to image.
- **Diffusion transformer (DiT)** — replace the U-Net denoiser with a transformer that works on image patches. It scales with data and size the way language transformers do, which U-Nets did not.
- **Rectified flow / flow matching** — instead of a wandering noise-removal path, train the model to follow a near **straight line** from noise to data. Straight paths need far fewer sampling steps for the same quality.

<svg viewBox="0 0 320 100" role="img" aria-label="A curved winding path from noise to image contrasted with a straight direct path, showing rectified flow needs fewer steps" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="30" cy="50" r="7" fill="#8a8a8a"/><text x="30" y="76" text-anchor="middle" fill="#6b6b6b">noise</text>
  <circle cx="290" cy="50" r="7" fill="#1a3a2a"/><text x="290" y="76" text-anchor="middle" fill="#6b6b6b">image</text>
  <path d="M38 50 C90 10 130 90 180 40 C220 12 250 70 282 50" stroke="#c0392b" fill="none" stroke-dasharray="3 2"/><text x="120" y="20" fill="#c0392b">diffusion: many steps</text>
  <path d="M38 54 L282 54" stroke="#24405e" stroke-width="2"/><text x="150" y="92" text-anchor="middle" fill="#24405e">rectified flow: few steps</text>
</svg>

- **Stable Diffusion 3** and **Flux** (both 2024) combine the two as a **multimodal DiT (MMDiT)** trained with rectified flow, processing image and text tokens in one transformer.

:::note
The pattern rhymes with language: once the transformer replaced task-specific architectures, scale did the rest. Image generation is converging on the same backbone as text, which is why one model increasingly handles both.
:::
