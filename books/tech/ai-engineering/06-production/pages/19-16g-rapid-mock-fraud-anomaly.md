## Rapid mock: fraud / anomaly triage

- **Prompt:** "Use LLMs to help detect and investigate fraud." **Clarify:** high transaction volume, extreme class imbalance (fraud is rare), false positives are costly (block a real customer), explanations required for analysts and regulators, real-time-ish.
- The insight mirrors recommendations: **LLMs don't replace the fraud model** — a fast ML classifier scores every transaction; the LLM *investigates and explains* the flagged minority.

<svg viewBox="0 0 360 62" role="img" aria-label="Every transaction scored by a fast model; flagged ones investigated by an LLM that gathers context and explains" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="24" width="60" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="38" y="35" text-anchor="middle">ML score (all)</text>
  <rect x="86" y="24" width="70" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="121" y="35" text-anchor="middle">flagged (rare)</text>
  <rect x="174" y="24" width="90" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="219" y="32" text-anchor="middle" font-size="5.5">LLM: gather context</text><text x="219" y="39" text-anchor="middle" font-size="5" fill="#6b6b6b">+ explain + recommend</text>
  <rect x="282" y="24" width="70" height="16" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="317" y="35" text-anchor="middle">analyst decides</text>
  <path d="M68 32 L84 32 M156 32 L172 32 M264 32 L280 32" stroke="#888" marker-end="url(#fa)"/>
  <defs><marker id="fa" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The LLM is an investigation copilot**, not the detector. For a flagged transaction it gathers context (account history, related transactions, known patterns), writes a plain-language explanation of *why* it looks suspicious, and drafts a recommended action — compressing an analyst's 20-minute investigation into a reviewable summary. The analyst decides.
- **Why not LLM-as-detector.** Extreme class imbalance and volume make a specialised ML model far better and cheaper at *scoring*; the LLM's value is *reasoning over context and explaining*, which ML models can't do and which regulators require.

:::interview
"Where does an LLM fit in fraud detection?"

As the **investigator and explainer**, not the detector. A specialised ML model scores every transaction — it handles the volume and extreme class imbalance far better and cheaper than an LLM could. The LLM works only on the flagged minority: it gathers context (history, related activity, known fraud patterns), explains *why* the transaction is suspicious in language an analyst and a regulator can act on, and drafts a recommended action for human decision. That plays to the LLM's strength (contextual reasoning + explanation, which fraud regulation demands) and away from its weakness (high-volume rare-event classification). "LLM investigates and explains, ML detects, human decides" is the answer.
:::
