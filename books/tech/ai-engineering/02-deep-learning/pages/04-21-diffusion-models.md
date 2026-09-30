## Diffusion models

- **Diffusion** is today's dominant way to generate images. The idea is oddly simple: learn to remove noise, one small step at a time.
- **Training**: take a real image, add a little random noise, and train the model to predict the noise that was added. Repeat across every noise level, from barely-noisy to pure static.
- **Generation**: start from pure noise and run the model backward — predict the noise, subtract a bit, repeat. After many steps, a clean image emerges.

<svg viewBox="0 0 340 96" role="img" aria-label="A sequence from pure noise gradually denoised step by step into a clear image, with an arrow labelled denoise pointing left to right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="15" y="30" width="46" height="40" fill="#8a8a8a"/><rect x="75" y="30" width="46" height="40" fill="#a9b0b8"/><rect x="135" y="30" width="46" height="40" fill="#c3cfd9"/><rect x="195" y="30" width="46" height="40" fill="#dbe6ef"/>
  <circle cx="278" cy="50" r="20" fill="#f4c542"/><circle cx="272" cy="45" r="2.5" fill="#1a1a1a"/><circle cx="284" cy="45" r="2.5" fill="#1a1a1a"/>
  <text x="38" y="84" text-anchor="middle" fill="#6b6b6b">noise</text><text x="278" y="84" text-anchor="middle" fill="#6b6b6b">image</text>
  <path d="M15 22 L300 22" stroke="#24405e" marker-end="url(#df)"/><text x="150" y="16" text-anchor="middle" fill="#24405e">denoise, step by step</text>
  <defs><marker id="df" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker></defs>
</svg>

- The denoiser is usually a U-Net (from segmentation) or, increasingly, a transformer. To steer output toward a text prompt, a CLIP text embedding conditions every step.

:::warn
Quality costs steps. Early diffusion needed ~1,000 denoising passes per image — seconds to minutes each. Faster samplers cut this to 20–50 steps, and **distillation** squeezes it toward a handful, but the step-count-versus-quality trade never fully disappears. Real-time diffusion is still a fight.
:::
