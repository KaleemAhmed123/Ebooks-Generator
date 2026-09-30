## Serving multimodal and reasoning models

- Two model classes break the standard chat serving profile and need their own capacity thinking.
- **Multimodal (VLM) serving** front-loads the cost. An image becomes hundreds to thousands of vision tokens (Booklet 5), so the *prefill* is huge before a single output token — TTFT balloons, and a high-resolution image can cost more prefill than a long text prompt.

<svg viewBox="0 0 360 84" role="img" aria-label="A VLM turns an image into many tokens inflating prefill; a reasoning model emits a long hidden thinking trace inflating output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">VLM: prefill blows up</text>
  <rect x="20" y="20" width="18" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="29" y="32" text-anchor="middle" font-size="5.5">img</text>
  <g fill="#24405e"><rect x="46" y="22" width="8" height="14"/><rect x="57" y="22" width="8" height="14"/><rect x="68" y="22" width="8" height="14"/><rect x="79" y="22" width="8" height="14"/><rect x="90" y="22" width="8" height="14"/><rect x="101" y="22" width="8" height="14"/><rect x="112" y="22" width="8" height="14"/><rect x="123" y="22" width="8" height="14"/></g>
  <text x="90" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">1 image → ~1k+ tokens</text>
  <text x="270" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">reasoning: output blows up</text>
  <rect x="210" y="22" width="14" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="217" y="33" text-anchor="middle" font-size="5.5">Q</text>
  <g fill="#a03050"><rect x="230" y="22" width="8" height="14"/><rect x="241" y="22" width="8" height="14"/><rect x="252" y="22" width="8" height="14"/><rect x="263" y="22" width="8" height="14"/><rect x="274" y="22" width="8" height="14"/><rect x="285" y="22" width="8" height="14"/><rect x="296" y="22" width="8" height="14"/><rect x="307" y="22" width="8" height="14"/><rect x="318" y="22" width="8" height="14"/></g>
  <text x="270" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">long hidden &lt;think&gt; trace</text>
</svg>

- **Reasoning-model serving** front-loads nothing and back-loads everything. Models that "think" before answering emit a long hidden reasoning trace — often many times the visible answer's length — so *output* tokens explode. That wrecks naive latency and cost estimates: a 200-token answer may hide 4,000 thinking tokens you pay for and wait on.
- **The serving consequences.** VLMs need prefill-heavy capacity planning and benefit from chunked prefill (17-15) to stop image prefills stalling others. Reasoning models need generous output-token budgets, higher TPOT tolerance, and a hard cap on thinking length — and their cost math must count the hidden tokens, or you under-budget by multiples.

:::interview
**"Why can't you size a reasoning model like a normal chat model?"** Because the visible answer hides a large reasoning trace — the model may generate thousands of internal tokens before the reply, all billed and all adding to latency. So the output-token count that drives GPU-seconds and cost is *far* higher than the response length suggests, and TTFT-to-first-*visible*-token can be long even when the stream is healthy. You budget on total generated tokens (thinking + answer), cap the thinking length, and set latency expectations accordingly. For VLMs the mirror-image point holds: the *image* dominates prefill, so TTFT, not decode, is the constraint.
:::
