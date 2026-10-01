## Flagship 2: fine-tuning pipeline — spec

- **Goal:** take the base model from Flagship 1 (or any pretrained model) and build the full pipeline that turns it into a *useful assistant* — instruction-tuned, preference-aligned, evaluated, and trained stably at scale. This is Booklet 4's alignment theory, built.
- **The stages**, mirroring how real post-training works:

<svg viewBox="0 0 360 96" role="img" aria-label="Pipeline: base model, SFT instruction tuning, DPO preference alignment, evaluation, with stability and scaling supporting all stages" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="20" width="56" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="40" y="31" text-anchor="middle">base model</text>
  <rect x="84" y="20" width="56" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="112" y="31" text-anchor="middle">SFT</text>
  <rect x="156" y="20" width="56" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="184" y="31" text-anchor="middle">DPO</text>
  <rect x="228" y="20" width="56" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="256" y="31" text-anchor="middle">eval</text>
  <rect x="300" y="20" width="52" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="326" y="31" text-anchor="middle">ship</text>
  <path d="M68 29 L82 29" stroke="#888" marker-end="url(#ft)"/><path d="M140 29 L154 29" stroke="#888" marker-end="url(#ft)"/><path d="M212 29 L226 29" stroke="#888" marker-end="url(#ft)"/><path d="M284 29 L298 29" stroke="#888" marker-end="url(#ft)"/>
  <rect x="40" y="58" width="284" height="28" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="182" y="70" text-anchor="middle" font-size="6.5" fill="#3b7a57">stability + scaling (every stage)</text><text x="182" y="80" text-anchor="middle" font-size="5.5" fill="#6b6b6b">LR schedule · grad clip · accumulation · AMP · checkpointing · FSDP/DDP</text>
</svg>

- **SFT then DPO** is the standard recipe: **supervised fine-tuning** teaches the *format* (follow instructions, respond as an assistant) on demonstration data; **DPO** then aligns *preferences* (which of two responses is better) on preference data. SFT makes it an assistant; DPO makes it a *good* one.
- **The supporting layer is what makes it real:** learning-rate schedules, gradient clipping and accumulation, mixed precision, checkpointing, and multi-GPU sharding (FSDP/DDP) — the machinery that turns "it runs on a toy" into "it trains a real model without diverging or OOMing." Each gets a page.

:::note
The reason to build this after Flagship 1: you now know the model is just tensors and a training loop, so fine-tuning is *the same loop with different data and a different loss*. SFT is next-token prediction on demonstration data; DPO swaps the loss for a preference objective. Seeing post-training as "the training loop, re-pointed" — not a separate magic — is the intuition that lets you debug a fine-tune, choose SFT-vs-DPO-vs-RLHF, and reason about what alignment actually changes in the weights.
:::
