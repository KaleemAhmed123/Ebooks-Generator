## The VLM landscape: picking one

- The closed frontier VLMs (GPT-class, Gemini, Claude — all natively multimodal) lead on hard reasoning; the open line (Qwen-VL, InternVL, Pixtral, Molmo, Llama Vision, Gemma Vision) wins on cost, privacy, and control. Here is the working decision grid.

| Need | Reach for | Why |
|---|---|---|
| Best reasoning, no infra | Frontier API (Gemini / GPT / Claude) | Native multimodal, strongest on hard visual reasoning |
| Documents, charts, OCR | Qwen-VL, InternVL (high-res) | Native/tiled high resolution keeps small text |
| On-device / edge | Small Qwen-VL, Gemma Vision (2–4B) | Fit in tight memory and latency budgets |
| Robotics / UI grounding | Molmo, VLAs (pointing/coords) | Emit coordinates to act, not just describe |
| Video understanding | Qwen-VL, LLaVA-OneVision | Frame sampling + temporal position |
| Full open data / research | Molmo | Reproducible, open training data |

<svg viewBox="0 0 360 84" role="img" aria-label="Two axes: openness versus capability, with frontier APIs high-capability-closed and open models spread across" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="70" x2="340" y2="70" stroke="#888"/><line x1="30" y1="12" x2="30" y2="70" stroke="#888"/>
  <text x="185" y="82" text-anchor="middle" font-size="6" fill="#6b6b6b">open → closed</text>
  <text x="18" y="40" font-size="6" fill="#6b6b6b" transform="rotate(-90 18 40)">capability</text>
  <text x="300" y="22" font-size="6" fill="#24405e">● frontier API</text>
  <text x="80" y="34" font-size="6" fill="#1a3a2a">● InternVL</text>
  <text x="150" y="46" font-size="6" fill="#1a3a2a">● Qwen-VL</text>
  <text x="70" y="58" font-size="6" fill="#1a3a2a">● Pixtral/Molmo</text>
  <text x="120" y="66" font-size="6" fill="#6b6b6b">● Gemma/Llama small</text>
</svg>

:::interview
"How would you choose a VLM for a product?"

Start from the task's *perception* demand, not the brand. Fine text/documents → high resolution (Qwen-VL/InternVL or a frontier API). Acting on a screen → a model that emits coordinates. Tight latency/privacy → a small open model on-device. Only then weigh cost and whether you can self-host. The winning answer names the constraint first and the model second.
:::
