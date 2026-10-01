## Video-language models

- A video is a stack of images plus time. The naive approach — encode every frame as a full image — drowns instantly: a 1-minute clip at 30 fps is 1,800 frames × 576 tokens ≈ **1 million tokens**. No model affords that.
- So every video VLM is a study in **throwing frames and tokens away wisely**:

<svg viewBox="0 0 360 92" role="img" aria-label="Video is subsampled to keyframes, each encoded and pooled, then fed to the LLM with time positions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#ccc"><rect x="8" y="20" width="10" height="14"/><rect x="20" y="20" width="10" height="14"/><rect x="32" y="20" width="10" height="14"/><rect x="44" y="20" width="10" height="14"/><rect x="56" y="20" width="10" height="14"/><rect x="68" y="20" width="10" height="14"/></g>
  <text x="43" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">1800 frames</text>
  <text x="90" y="30" font-size="7">→ sample</text>
  <g fill="#6a9bd0"><rect x="140" y="20" width="12" height="14"/><rect x="156" y="20" width="12" height="14"/><rect x="172" y="20" width="12" height="14"/></g>
  <text x="162" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">keyframes</text>
  <text x="196" y="30" font-size="7">→ pool</text>
  <rect x="240" y="18" width="50" height="18" rx="2" fill="#a03050"/><text x="265" y="30" text-anchor="middle" fill="#fff" font-size="6">few tokens/frame</text>
  <rect x="304" y="16" width="48" height="24" rx="3" fill="#24405e"/><text x="328" y="31" text-anchor="middle" fill="#fff" font-size="6">LLM</text>
  <text x="180" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">+ temporal position so the model knows frame order and timing</text>
  <path d="M290 27 L302 27" stroke="#888" marker-end="url(#vl)"/>
  <defs><marker id="vl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Frame sampling.** Take 1–2 frames per second, or pick keyframes where the scene changes. You lose fast motion but keep the story.
- **Per-frame token pooling.** Pool each frame's patches down to a handful of tokens (Qwen-VL, LLaVA-OneVision) so 64 frames cost what 2 unpooled frames would.
- **Temporal position.** Tag each frame with its time (M-RoPE's time axis) so the model can answer "what happened *after* X?" and not just "what is in the video?"

:::interview
"Why can't a VLM just watch a full video frame by frame?"

Token budget. Every frame is hundreds of visual tokens; even a short clip becomes millions of tokens — far past any context window and impossibly slow. Video VLMs subsample frames and pool tokens hard, keeping temporal position so order and timing survive. The engineering question is never "how do I show it everything?" but "what can I safely drop?"
:::
