## Structured decoding in serving

- Production systems need the model to emit **valid JSON** (or a specific schema) so downstream code can parse it — a tool call, an extracted record, an API payload. Asking politely in the prompt fails a fraction of the time, and a fraction of a million requests is a lot of parse errors.
- **Guided (constrained) decoding** makes invalid output *impossible*: at each step the engine masks the token logits so only tokens that keep the output valid against a grammar or JSON Schema can be sampled.

<svg viewBox="0 0 360 84" role="img" aria-label="At each decode step a grammar masks disallowed tokens so the sampled output always conforms to the schema" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="60" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="44" y="43" text-anchor="middle" font-size="6">logits</text>
  <rect x="98" y="24" width="70" height="32" rx="3" fill="#24405e"/><text x="133" y="37" text-anchor="middle" font-size="6" fill="#fff">grammar mask</text><text x="133" y="48" text-anchor="middle" font-size="5.5" fill="#cdd">schema state</text>
  <rect x="192" y="30" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="227" y="43" text-anchor="middle" font-size="6">sample (valid only)</text>
  <rect x="286" y="30" width="60" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="316" y="43" text-anchor="middle" font-size="6">valid JSON ✓</text>
  <path d="M74 40 L96 40" stroke="#888" marker-end="url(#gd)"/><path d="M168 40 L190 40" stroke="#888" marker-end="url(#gd)"/><path d="M262 40 L284 40" stroke="#888" marker-end="url(#gd)"/>
  <path d="M316 50 Q316 68 200 68 Q133 68 133 56" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#gd)"/><text x="220" y="78" font-size="5.5" fill="#a03050">state advances per token</text>
  <defs><marker id="gd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Engines implement it as a **finite-state machine over the schema** (libraries like Outlines/XGrammar): the current state defines which tokens are legal next, the engine zeroes the rest before sampling, and the output is guaranteed to parse. vLLM and SGLang expose it as a `guided_json` / `response_format` option.
- **It is near-free at inference** — masking is cheap — and eliminates a whole class of production errors and retries. For any tool-calling or extraction path, it should be on by default.

:::warn
Constrained decoding guarantees the output is *well-formed*, not *correct*. The model can still emit `{"refund_amount": 999999}` — valid JSON, wrong number. And an over-tight grammar can *distort* behaviour: forcing a schema the model was about to explain in prose can truncate reasoning. Use it to enforce structure, keep a validation + business-logic check after parsing, and give the model a free-text "reasoning" field before the constrained fields when it needs to think.
:::
