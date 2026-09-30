## Understand *and* generate in one model

- So far the models split by job. A projector VLM (LLaVA) **understands** images but cannot draw. A diffusion model (Booklet 2) **generates** images but cannot answer questions. The 2024–2026 frontier goal is **one model that does both** — read an image, reason about it, and produce a new image, in one system.
- Why bother unifying? Three reasons:
  - **Shared understanding helps generation.** A model that truly reads "a red cube *on top of* a blue sphere" places them correctly; a pure text-to-image model often muddles such relations.
  - **Editing and iteration.** "Make the sky darker and add a moon" needs understanding the current image *and* generating the next — natural for a unified model, awkward across two.
  - **One deployment.** One set of weights, one API, instead of a VLM plus a diffusion model plus glue.

<svg viewBox="0 0 360 92" role="img" aria-label="Two specialized models versus one unified model that both understands and generates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">split (today's default)</text>
  <rect x="30" y="22" width="54" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="57" y="36" text-anchor="middle" font-size="6">VLM: read</text>
  <rect x="100" y="22" width="60" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="130" y="36" text-anchor="middle" font-size="6">diffusion: draw</text>
  <text x="90" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">two models, glue between</text>
  <line x1="185" y1="16" x2="185" y2="66" stroke="#eee"/>
  <text x="275" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">unified</text>
  <rect x="215" y="22" width="120" height="30" rx="4" fill="#24405e"/><text x="275" y="36" text-anchor="middle" fill="#fff" font-size="6.5">read + reason + draw</text><text x="275" y="47" text-anchor="middle" fill="#cdd" font-size="5.5">one model</text>
</svg>

- The three ways to unify, next pages: **Transfusion** (one transformer, a language loss *and* a diffusion loss), **Show-o** (discrete diffusion for images + autoregression for text), **Janus-Pro** (one transformer, but *two* visual encoders — one to read, one to draw).

:::note
The design fork is whether images should be **discrete** (VQ tokens, autoregressive, like Emu3) or **continuous** (diffusion, like Stable Diffusion). Discrete unifies the loss but caps fidelity; continuous keeps fidelity but needs a second training objective bolted into the transformer. Every unified model is an answer to that fork.
:::
