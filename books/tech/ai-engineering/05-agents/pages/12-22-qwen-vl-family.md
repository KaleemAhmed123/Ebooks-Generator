## The Qwen-VL family

- **Qwen-VL** (Alibaba) is, as of September 2026, the most widely deployed open VLM line, because it pairs strong quality with a genuinely flexible vision path. **[VERIFY versions/specs]**
- Two design choices define it:
  - **Naive dynamic resolution.** Images enter at (near) native resolution and produce a *variable* number of visual tokens — no fixed tile grid, NaViT-style. A small icon costs a few tokens; a dense page costs many.
  - **M-RoPE** (Multimodal Rotary Position Embedding). RoPE (Booklet 3) extended to encode position along **time, height, and width** separately, so the model knows a patch's 2-D location and a frame's moment in a video, not just its index in a flat sequence.

<svg viewBox="0 0 360 88" role="img" aria-label="M-RoPE encodes position along time, height and width for image and video patches" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="30" width="90" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="59" y="44" text-anchor="middle" font-size="6">flat index</text><text x="59" y="55" text-anchor="middle" font-size="6" fill="#a03050">loses 2-D layout</text>
  <text x="118" y="50" font-size="7">→</text>
  <rect x="140" y="24" width="100" height="46" rx="3" fill="#24405e"/><text x="190" y="40" text-anchor="middle" fill="#fff" font-size="6.5">M-RoPE</text><text x="190" y="53" text-anchor="middle" fill="#cdd" font-size="6">(t, h, w) position</text><text x="190" y="64" text-anchor="middle" fill="#cdd" font-size="6">per token</text>
  <text x="256" y="50" font-size="7">→</text>
  <rect x="272" y="30" width="80" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="312" y="44" text-anchor="middle" font-size="6">knows where +</text><text x="312" y="55" text-anchor="middle" font-size="6">when each patch is</text>
</svg>

- **Video:** Qwen samples frames at a **dynamic FPS** (frame rate) and uses the time axis of M-RoPE for temporal grounding ("what happened after the door opened?"). It reads hours of video by pooling and sampling rather than dumping every frame.
- The family spans small (2–3B, for edge/on-device) to large (70B+) with the same interface — pick the size for your latency and cost budget.

:::note
Qwen-VL is the pragmatic default open VLM in 2026: native dynamic resolution keeps detail without manual tiling, M-RoPE gives real spatial/temporal grounding, and the size range lets you trade quality for cost. When a task says "read this document" or "understand this video," this line is the first thing most teams try.
:::
