## Patch-n-pack and NaViT

- AnyRes bends a *fixed*-resolution encoder to high-res images. **NaViT** (Native Resolution ViT, Dehghani et al., Google, 2023) fixes the encoder itself so it accepts **any resolution and aspect ratio directly**, no tiling.
- Its engine is **patch-n-pack**: patches from several different-sized images are packed into one training sequence, like text examples packed to fill a fixed length, with an attention mask keeping each image's patches from attending across into another's.

<svg viewBox="0 0 360 96" role="img" aria-label="Patches from three differently sized images are packed into one sequence with a block-diagonal mask" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#6a9bd0"><rect x="12" y="30" width="12" height="12"/><rect x="26" y="30" width="12" height="12"/><rect x="40" y="30" width="12" height="12"/></g>
  <g fill="#1a3a2a"><rect x="58" y="30" width="12" height="12"/><rect x="72" y="30" width="12" height="12"/></g>
  <g fill="#a03050"><rect x="90" y="30" width="12" height="12"/><rect x="104" y="30" width="12" height="12"/><rect x="118" y="30" width="12" height="12"/><rect x="132" y="30" width="12" height="12"/></g>
  <rect x="10" y="28" width="126" height="16" fill="none" stroke="#333"/>
  <text x="73" y="58" text-anchor="middle" font-size="6" fill="#6b6b6b">one packed sequence · 3 images, different sizes</text>
  <rect x="188" y="14" width="80" height="66" fill="#f4f4f4" stroke="#888"/><rect x="188" y="14" width="30" height="24" fill="#cfe0f2"/><rect x="218" y="38" width="20" height="16" fill="#d3ead3"/><rect x="238" y="54" width="30" height="26" fill="#f2d3dd"/><text x="228" y="92" text-anchor="middle" font-size="6" fill="#6b6b6b">block-diagonal mask</text>
  <text x="300" y="34" font-size="6">each image only</text><text x="300" y="45" font-size="6">attends to itself</text>
</svg>

- **Why it matters:** no distortion (aspect ratio preserved), no wasted compute on padding, and **token dropping** — during training you can randomly drop patches to trade a little accuracy for a lot of speed. Throughput jumps because you pack, not pad.
- NaViT-style native-resolution encoding is the modern direction: **Qwen2-VL** and Pixtral process images at their native resolution and emit a variable token count, no fixed tile grid.

:::interview
**"AnyRes tiling vs native-resolution (NaViT/patch-n-pack) — what's the difference?"** Tiling reuses a fixed-size encoder by chopping the image into encoder-sized squares and gluing the tokens — simple, works with any off-the-shelf CLIP, but adds seams and a global thumbnail. Native resolution changes the encoder to ingest arbitrary sizes directly and pack them efficiently — cleaner and no seams, but you must train that encoder. Tiling is the pragmatic bolt-on; native resolution is the from-scratch answer.
:::
