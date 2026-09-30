## LLaVA: the simplest thing that works

- **LLaVA** (Large Language and Vision Assistant, Liu et al., 2023) is the design most production VLMs now copy, and it is almost embarrassingly simple: take a CLIP vision encoder, take an LLM, and connect them with **one linear layer**.
- No Q-Former, no cross-attention, no gates. Each CLIP patch feature is projected straight into the LLM's token space and prepended to the text. The LLM is *not* frozen during instruction tuning, so it genuinely learns to read the visual tokens.

<svg viewBox="0 0 360 96" role="img" aria-label="LLaVA connects a CLIP encoder to an LLM through a single projection layer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="34" width="58" height="32" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="37" y="48" text-anchor="middle" font-size="6">CLIP ViT</text><text x="37" y="59" text-anchor="middle" font-size="6">❄ frozen</text>
  <rect x="98" y="36" width="56" height="28" rx="3" fill="#a03050"/><text x="126" y="50" text-anchor="middle" fill="#fff" font-size="6">projector</text><text x="126" y="60" text-anchor="middle" fill="#fc8" font-size="5.5">🔥 W·x</text>
  <rect x="186" y="30" width="68" height="40" rx="4" fill="#24405e"/><text x="220" y="46" text-anchor="middle" fill="#fff" font-size="7">LLM</text><text x="220" y="59" text-anchor="middle" fill="#fc8" font-size="5.5">🔥 tuned</text>
  <rect x="288" y="38" width="60" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="318" y="53" text-anchor="middle" font-size="6">answer</text>
  <path d="M66 50 L96 50" stroke="#888" marker-end="url(#lv)"/><path d="M154 50 L184 50" stroke="#888" marker-end="url(#lv)"/><path d="M254 50 L286 50" stroke="#888" marker-end="url(#lv)"/>
  <text x="126" y="82" text-anchor="middle" font-size="6" fill="#6b6b6b">one matrix multiply turns a patch into an LLM token</text>
  <defs><marker id="lv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Why it works when it looks too easy: CLIP already did the hard alignment (its patches are language-shaped), so a single linear map is enough to finish the translation. The LLM does the reasoning it was always good at, now over a sequence that happens to include image tokens.
- All 576 patches (at 336 px) go through — **no bottleneck**. That is why LLaVA keeps fine detail that BLIP-2 discards, at the cost of a longer sequence.

:::note
LLaVA is the answer to "what is the least I can build to get a working VLM?" A frozen CLIP, a frozen-then-tuned LLM, and a projector you can train on one machine in a day. Every open VLM you will actually deploy in 2026 — Qwen-VL, InternVL, Pixtral — is a LLaVA-style projector VLM with the resolution and data turned up.
:::
