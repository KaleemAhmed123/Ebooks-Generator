# LLMs from Scratch

## The LLM lifecycle

- A large language model is not one training run. It is a **pipeline of stages**, each turning the model into something more useful than the last. Knowing the stages tells you what any model can and cannot do.

<svg viewBox="0 0 344 92" role="img" aria-label="The lifecycle: data to pretraining to base model, then SFT to instruct model, then alignment to chat model, then quantize and serve" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="20" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="32" y="30" text-anchor="middle">pretrain</text><text x="32" y="39" text-anchor="middle" fill="#6b6b6b">trillions tok</text>
  <rect x="74" y="20" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="100" y="30" text-anchor="middle">base</text><text x="100" y="39" text-anchor="middle" fill="#6b6b6b">predicts text</text>
  <rect x="142" y="20" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="168" y="30" text-anchor="middle">SFT</text><text x="168" y="39" text-anchor="middle" fill="#6b6b6b">follows tasks</text>
  <rect x="210" y="20" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="236" y="30" text-anchor="middle">align</text><text x="236" y="39" text-anchor="middle" fill="#6b6b6b">RLHF/DPO</text>
  <rect x="278" y="20" width="60" height="22" rx="3" fill="#24405e"/><text x="308" y="30" text-anchor="middle" fill="#fff">quantize</text><text x="308" y="39" text-anchor="middle" fill="#fff">+ serve</text>
  <path d="M58 31 L72 31" stroke="#1a1a1a" marker-end="url(#l)"/><path d="M126 31 L140 31" stroke="#1a1a1a" marker-end="url(#l)"/><path d="M194 31 L208 31" stroke="#1a1a1a" marker-end="url(#l)"/><path d="M262 31 L276 31" stroke="#1a1a1a" marker-end="url(#l)"/>
  <text x="100" y="62" text-anchor="middle" fill="#6b6b6b">↑ months, $millions</text><text x="240" y="62" text-anchor="middle" fill="#6b6b6b">↑ days, cheap</text>
  <defs><marker id="l" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Pretrain** — read a huge slice of the internet, learn next-token prediction. This is where the knowledge and cost live.
- **SFT** — teach it to follow instructions from example answers.
- **Align** — teach it human preferences (RLHF or DPO).
- **Quantize + serve** — shrink it and run it cheaply in production.

:::note
The split that matters for engineers: **pretraining costs millions and only a few labs do it.** SFT, alignment, quantization and serving are cheap, fast, and where 99% of applied work happens. This module walks the whole pipeline so you know what each stage buys.
:::

:::warn
You cannot fix a knowledge gap with alignment, and you cannot fix bad behaviour with more pretraining. Each stage addresses a different failure. Misdiagnosing which stage is at fault wastes the most money in applied LLM work.
:::
