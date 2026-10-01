## Flagship 1: GPT from scratch — spec

- **Goal:** build a working GPT — tokenizer, model, training loop, and pretrained-weight loading — from nothing but PyTorch, so you understand every tensor a production LLM is made of. This is the capstone Booklets 3–4 pointed at, built self-contained here.
- **The eight steps**, each a page, each runnable:

<svg viewBox="0 0 360 110" role="img" aria-label="Eight steps: BPE tokenizer, dataset, embeddings, multi-head attention, transformer block, model assembly, training loop, load weights" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g text-anchor="middle">
   <rect x="12" y="16" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="28">1 BPE tokenizer</text>
   <rect x="96" y="16" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="132" y="28">2 dataset</text>
   <rect x="180" y="16" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="216" y="28">3 embeddings</text>
   <rect x="264" y="16" width="84" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="306" y="28">4 attention</text>
   <rect x="12" y="52" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="64">5 block</text>
   <rect x="96" y="52" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="132" y="64">6 assemble</text>
   <rect x="180" y="52" width="72" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="216" y="64">7 train</text>
   <rect x="264" y="52" width="84" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="306" y="64">8 load weights</text>
  </g>
  <text x="180" y="92" text-anchor="middle" font-size="7">the same architecture, scaled up, IS every GPT-family model</text>
  <path d="M84 26 L94 26" stroke="#888"/><path d="M168 26 L178 26" stroke="#888"/><path d="M252 26 L262 26" stroke="#888"/><path d="M84 62 L94 62" stroke="#888"/><path d="M168 62 L178 62" stroke="#888"/><path d="M252 62 L262 62" stroke="#888"/>
</svg>

- **What you'll have at the end:** a `GPT` module you can train on any text and — because it matches the GPT-2 architecture — load real pretrained weights into for actual generation. Small enough to train on a laptop GPU, structurally identical to the frontier.
- **Prereqs used, not re-derived:** attention/QKV, transformer blocks, and cross-entropy from Booklets 3–4 are *applied* here in code. We re-teach the *build*, referencing those for the math.

:::note
The reason this is the first flagship: once you have implemented attention, a block, and a training loop yourself, every serving optimisation in Module 17 (KV cache, quantisation, batching) and every training concept in Flagship 2 stops being abstract — you know exactly which tensor each one touches. A production AI engineer who has built GPT once reads model cards, debugs OOMs, and reasons about scaling with an intuition no amount of API usage provides.
:::
