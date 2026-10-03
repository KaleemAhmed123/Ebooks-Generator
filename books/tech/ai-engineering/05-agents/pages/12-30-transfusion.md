## Transfusion: autoregression + diffusion in one

- **Transfusion** (Meta, 2024) unifies without discretizing images. One transformer carries **two losses at once**: next-token prediction on text tokens, and a **diffusion** objective on *continuous* image patches. Text stays autoregressive; images stay continuous (high fidelity).
- Inside one sequence, text spans are trained/generated left-to-right with causal attention, while image spans are trained to **denoise** (bidirectional attention within the image), the way a diffusion model does.

<svg viewBox="0 0 360 96" role="img" aria-label="One transformer applies a language loss to text tokens and a diffusion denoising loss to image patches" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="24" width="40" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="36" text-anchor="middle" font-size="6">text</text>
  <rect x="56" y="24" width="70" height="18" rx="2" fill="#a03050"/><text x="91" y="36" text-anchor="middle" fill="#fff" font-size="6">image patches</text>
  <rect x="128" y="24" width="40" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="148" y="36" text-anchor="middle" font-size="6">text</text>
  <text x="34" y="58" text-anchor="middle" font-size="5.5" fill="#24405e">LM loss →</text>
  <text x="91" y="58" text-anchor="middle" font-size="5.5" fill="#a03050">diffusion loss ↺</text>
  <text x="148" y="58" text-anchor="middle" font-size="5.5" fill="#24405e">LM loss →</text>
  <rect x="210" y="22" width="130" height="34" rx="4" fill="#24405e"/><text x="275" y="36" text-anchor="middle" fill="#fff" font-size="6.5">one transformer</text><text x="275" y="48" text-anchor="middle" fill="#cdd" font-size="5.5">two objectives, one net</text>
  <path d="M168 33 L208 39" stroke="#888" marker-end="url(#tf)"/>
  <text x="180" y="88" text-anchor="middle" font-size="6" fill="#6b6b6b">causal for text, bidirectional denoising for image spans</text>
  <defs><marker id="tf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it is a big deal:** it keeps diffusion-grade image quality (no VQ rounding) *and* LLM-grade text, in a single set of weights — arguably the cleanest resolution of the discrete-vs-continuous fork. Generation of an image runs the diffusion denoising loop over that span; text runs normal decoding.
- Cost: two training objectives and two attention regimes make it more complex to build and serve than a pure autoregressive model.

:::interview
"How can one transformer both understand and generate images at high fidelity?"

Transfusion's answer: give it two losses. Apply language-model loss to text tokens and a diffusion (denoising) loss to continuous image patches, in the same sequence and network. You avoid VQ's fidelity loss because images never get discretized, and you keep a single model. The price is a hybrid training/inference regime — causal for text, iterative denoising for images.
:::
