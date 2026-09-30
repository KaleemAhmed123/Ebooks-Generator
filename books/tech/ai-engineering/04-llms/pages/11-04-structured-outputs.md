## Structured outputs

- To use an LLM inside software, you need its output in a **fixed shape** — JSON your code can parse, not prose. Asking nicely ("reply in JSON") mostly works and fails exactly when you can least afford it.
- The reliable fix is **constrained decoding**: at each step, mask out every token that would break the required grammar, so the output *cannot* be invalid.

<svg viewBox="0 0 316 56" role="img" aria-label="A grammar allows only valid next tokens; the model can only sample from the allowed set, guaranteeing valid JSON" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle">after {"name":</text>
  <g><rect x="20" y="22" width="34" height="14" rx="2" fill="#eafaf0" stroke="#1a3a2a"/><text x="37" y="32" text-anchor="middle" font-size="7">"</text>
     <rect x="60" y="22" width="34" height="14" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="77" y="32" text-anchor="middle" font-size="7">42</text>
     <rect x="100" y="22" width="34" height="14" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="117" y="32" text-anchor="middle" font-size="7">}</text></g>
  <text x="60" y="50" font-size="6.5" fill="#1a3a2a">allowed</text><text x="115" y="50" font-size="6.5" fill="#c0392b">masked out</text>
  <text x="240" y="30" text-anchor="middle" fill="#24405e" font-size="7">grammar forces</text><text x="240" y="42" text-anchor="middle" fill="#24405e" font-size="7">valid structure</text>
</svg>

- Two levels in practice:
  - **Schema / function-calling APIs** — pass a JSON Schema; the provider guarantees output that validates against it (OpenAI "structured outputs", tool schemas). The easy path.
  - **Grammar-constrained libraries** — Outlines, XGrammar, `llama.cpp` GBNF enforce any regex or grammar locally on open models.
- Pair it with a **validation layer**: parse the output into a typed object (Pydantic in Python) and reject or retry on failure. Never trust raw text.

:::warn
Constraints guarantee valid *structure*, not correct *content*. The model can emit perfectly-formed JSON with the wrong values, or contort its reasoning to satisfy a rigid schema and answer worse. And an over-tight grammar can make generation slower or impossible if no valid token exists. Validate the meaning, not just the braces.
:::
