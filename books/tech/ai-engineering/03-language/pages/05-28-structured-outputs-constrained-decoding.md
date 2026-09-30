## Structured outputs

- Real systems need a model's output as **valid JSON** (or a specific schema), not free prose — so code can parse it. Asking nicely in the prompt works most of the time and fails exactly when you cannot afford it.
- **Constrained decoding** makes invalid output *impossible* rather than merely discouraged. At each step, the model normally picks from the whole vocabulary; constrained decoding **masks out every token that would break the grammar** before sampling.

<svg viewBox="0 0 360 78" role="img" aria-label="At a decode step, tokens that would violate the JSON grammar are masked, leaving only valid ones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="20" y="20" fill="#6b6b6b">next-token candidates:</text>
  <g><rect x="20" y="28" width="40" height="18" fill="#1a3a2a"/><text x="40" y="41" text-anchor="middle" fill="#fff">"</text>
     <rect x="64" y="28" width="40" height="18" fill="#ccc"/><text x="84" y="41" text-anchor="middle">cat</text>
     <rect x="108" y="28" width="40" height="18" fill="#ccc"/><text x="128" y="41" text-anchor="middle">42</text>
     <rect x="152" y="28" width="40" height="18" fill="#ccc"/><text x="172" y="41" text-anchor="middle">the</text></g>
  <text x="20" y="64" font-size="7" fill="#6b6b6b">grammar expects a string here → only <tspan fill="#1a3a2a">"</tspan> is allowed; grey tokens masked to probability 0</text>
</svg>

- Libraries do this for you (Outlines, llama.cpp grammars) and major APIs expose it directly — OpenAI's Structured Outputs, Anthropic tool-use schemas, Google's response schemas — guaranteeing schema-valid JSON as of September 2026.

:::warn
Constrained decoding guarantees the output *parses* — never that it is *correct*. Forced to emit a number, the model emits a syntactically valid number that may be wrong or invented. It also slightly distorts the model's natural distribution (some phrasings become unreachable), which can dent quality. Use it to remove parsing failures, then still validate the *values*.
:::
