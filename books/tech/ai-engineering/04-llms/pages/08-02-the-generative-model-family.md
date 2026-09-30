## The generative model family

- Every generative model answers the same question — "what does real data look like, and how do I make more?" — with a different trick. Four families dominate.

<svg viewBox="0 0 350 104" role="img" aria-label="Four generative families: VAE encodes then decodes, GAN pits generator against critic, diffusion denoises noise, autoregressive predicts the next piece" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="10" width="76" height="38" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="46" y="24" text-anchor="middle" font-size="8" fill="#24405e">VAE</text><text x="46" y="36" text-anchor="middle">encode→decode</text>
  <rect x="92" y="10" width="76" height="38" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="130" y="24" text-anchor="middle" font-size="8" fill="#24405e">GAN</text><text x="130" y="36" text-anchor="middle">maker vs critic</text>
  <rect x="176" y="10" width="80" height="38" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="216" y="24" text-anchor="middle" font-size="8" fill="#24405e">diffusion</text><text x="216" y="36" text-anchor="middle">denoise noise</text>
  <rect x="264" y="10" width="80" height="38" rx="3" fill="#24405e"/><text x="304" y="24" text-anchor="middle" font-size="8" fill="#fff">autoregressive</text><text x="304" y="36" text-anchor="middle" fill="#fff">next piece</text>
  <text x="304" y="62" text-anchor="middle" fill="#c0392b" font-size="7.5">← this is the LLM</text>
</svg>

- **VAE** (variational autoencoder) — squeeze data into a compact code, then decode it back. Sample new codes to make new data.
- **GAN** (generative adversarial network) — a generator makes fakes, a discriminator judges them; they train against each other.
- **Diffusion** — start from pure noise and remove it step by step until an image appears.
- **Autoregressive** — generate one piece at a time, each conditioned on all pieces so far. This is how LLMs make text.

:::note
VAEs, GANs, diffusion, Stable Diffusion, ControlNet, and rectified flow are covered for **images** in Booklet 2 (Deep Learning, pages 04-20…04-23). This booklet takes only the **text-relevant** family — autoregressive generation — and builds the entire LLM on it.
:::

- Why autoregressive won for text: language is already a sequence with a natural order. Predicting the next word given the previous words is the most direct fit — no noise schedule, no adversarial game, just next-token prediction at massive scale.
