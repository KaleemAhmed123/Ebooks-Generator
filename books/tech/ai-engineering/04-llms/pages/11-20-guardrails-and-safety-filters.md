## Guardrails and safety filters

- An LLM will, unprompted, leak secrets, output toxic text, give dangerous advice, or drift off-topic. **Guardrails** are the checks around the model that catch bad input and bad output — the seatbelt, separate from the engine.
- They sit on **both sides** of the model:

<svg viewBox="0 0 330 66" role="img" aria-label="Input guardrails screen the user request, the model runs, output guardrails screen the response before it reaches the user" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="24" width="44" height="18" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="28" y="35" text-anchor="middle">user</text>
  <rect x="62" y="22" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="92" y="30" text-anchor="middle" font-size="6.5">input guard</text><text x="92" y="39" text-anchor="middle" font-size="6">screen request</text>
  <rect x="134" y="24" width="44" height="18" rx="3" fill="#24405e"/><text x="156" y="36" text-anchor="middle" fill="#fff">LLM</text>
  <rect x="190" y="22" width="66" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="223" y="30" text-anchor="middle" font-size="6.5">output guard</text><text x="223" y="39" text-anchor="middle" font-size="6">screen response</text>
  <rect x="268" y="24" width="56" height="18" rx="2" fill="#1a3a2a"/><text x="296" y="35" text-anchor="middle" fill="#fff">to user</text>
  <path d="M50 33 L60 33" stroke="#1a1a1a" marker-end="url(#gd)"/><path d="M122 33 L132 33" stroke="#1a1a1a" marker-end="url(#gd)"/><path d="M178 33 L188 33" stroke="#1a1a1a" marker-end="url(#gd)"/><path d="M256 33 L266 33" stroke="#1a1a1a" marker-end="url(#gd)"/>
  <defs><marker id="gd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Input guards** — block or flag disallowed requests, detect prompt injection (next page), strip or mask PII (personal data) before it reaches the model or logs.
- **Output guards** — check the response for toxicity, leaked secrets, PII, off-topic drift, and **groundedness** (does it match the retrieved context? — page 11-12). On failure: block, regenerate, or hand off to a human.
- Tools: **Llama Guard** and provider moderation APIs (classifiers), **NeMo Guardrails** and **Guardrails AI** (rule/flow frameworks), plus schema validation (page 11-04).

:::note
**Defence in depth.** No single guard is reliable. Layer cheap deterministic checks (regex, blocklists, schema) with model-based classifiers, and design for graceful failure — a safe refusal beats a risky answer. Alignment (Module 10) reduces bad outputs; guardrails catch what slips through.
:::

:::warn
Guardrails fight a **false-positive/false-negative** trade-off. Too strict and the assistant refuses normal requests and feels broken; too loose and harmful content escapes. There is no setting that is safe *and* never annoying — tune per use case, log both kinds of miss, and revisit as attacks evolve.
:::
