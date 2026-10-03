## InternVL and native multimodal pretraining

- **InternVL** (Shanghai AI Lab / OpenGVLab) takes the opposite bet from LLaVA on one axis: instead of a small frozen CLIP eye, it trains a **very large vision encoder** (InternViT, up to ~6B parameters) so the perception side is as strong as the language side.
- The intuition: a tiny 300M-param CLIP is a bottleneck no LLM can reason past. Scale the eye and the whole model sees more.

<svg viewBox="0 0 360 86" role="img" aria-label="A small vision encoder bottlenecks a large LLM, so InternVL scales the encoder up" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">typical VLM</text>
  <circle cx="40" cy="46" r="12" fill="#a03050"/><text x="40" y="49" text-anchor="middle" fill="#fff" font-size="5">eye</text>
  <circle cx="110" cy="46" r="26" fill="#24405e"/><text x="110" y="49" text-anchor="middle" fill="#fff" font-size="6">big LLM</text>
  <text x="40" y="72" text-anchor="middle" font-size="5.5" fill="#a03050">bottleneck</text>
  <line x1="180" y1="20" x2="180" y2="72" stroke="#eee"/>
  <text x="285" y="14" text-anchor="middle" font-size="6" fill="#6b6b6b">InternVL</text>
  <circle cx="245" cy="46" r="22" fill="#24405e"/><text x="245" y="49" text-anchor="middle" fill="#fff" font-size="5.5">InternViT</text>
  <circle cx="315" cy="46" r="24" fill="#24405e"/><text x="315" y="49" text-anchor="middle" fill="#fff" font-size="6">LLM</text>
  <text x="245" y="76" text-anchor="middle" font-size="5.5" fill="#1a3a2a">eye scaled up</text>
</svg>

- Recent InternVL versions push **native multimodal pretraining**: rather than gluing a pretrained LLM to a pretrained encoder late, they train the combined model on interleaved image-text from earlier, so vision and language co-adapt instead of one being bolted on.
- Result: a line that is consistently near the top of open VLM leaderboards on document, chart, and reasoning benchmarks — the "no compromises on the eye" school.

:::interview
"Why not just use a stronger LLM to fix a weak VLM?"

Because a VLM cannot reason about detail its encoder never resolved. If the eye is a 300M CLIP at 336 px, a bigger LLM still gets blurry features. InternVL's thesis is that perception and reasoning must scale *together* — sometimes the bottleneck is the eye, and no amount of LLM fixes it.
:::
