## Hallucination in VLMs

- A VLM **hallucinates** when it describes things not in the image — a person who is not there, a caption that says "sunny" over a grey sky, an invoice total it invented. It is the failure that destroys trust, because it is fluent and confident.
- Why VLMs are especially prone:
  - **Language prior overrides vision.** The LLM has strong expectations ("kitchens have sinks") and will report the expected object even when the image lacks it. The text half outvotes the eye.
  - **Weak perception on detail.** If the encoder did not resolve something, the LLM fills the gap with a plausible guess instead of "I can't tell."

<svg viewBox="0 0 360 78" role="img" aria-label="A grey-sky image where the model wrongly says sunny because its language prior overrides vision" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="18" width="70" height="44" rx="3" fill="#c9ccd1" stroke="#24405e"/><text x="49" y="44" text-anchor="middle" font-size="6" fill="#555">grey sky</text>
  <rect x="110" y="26" width="60" height="28" rx="3" fill="#24405e"/><text x="140" y="43" text-anchor="middle" fill="#fff" font-size="6">VLM</text>
  <rect x="196" y="20" width="150" height="18" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="271" y="32" text-anchor="middle" font-size="6" fill="#a03050">"a sunny day" ✗ (prior wins)</text>
  <rect x="196" y="44" width="150" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="56" text-anchor="middle" font-size="6" fill="#1a3a2a">"overcast sky" ✓ (grounded)</text>
  <path d="M84 40 L108 40" stroke="#888" marker-end="url(#hl)"/>
  <defs><marker id="hl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Measuring it — POPE.** POPE (Polling-based Object Probing Evaluation) asks simple yes/no questions — "is there a *clock* in the image?" — including objects that are *absent*. A model that says "yes" to absent objects reveals its hallucination rate directly. Cheap, and it exposes the language-prior bias precisely.
- **Reducing it:** higher resolution (so perception is real, not guessed), instruction tuning that rewards "not visible," letting the model abstain, and grounding prompts ("only report what you can see").

:::warn
The dangerous hallucinations are the *plausible* ones. A model that invents a wrong invoice total in valid JSON passes every schema check and ships a financial error. Structured output guarantees the shape, never the truth. For high-stakes fields, verify against the source (re-read the pixels, cross-check a second pass) — do not trust a single confident answer.
:::
