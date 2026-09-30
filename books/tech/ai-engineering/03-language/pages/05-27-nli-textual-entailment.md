## Natural language inference

- **Natural language inference (NLI)**, also called textual entailment, asks: given a **premise** sentence, does a **hypothesis** sentence follow? Three labels.
- **Entailment** — the hypothesis must be true if the premise is. *Premise:* "A man is playing guitar on stage." *Hypothesis:* "A person is performing music." → entailment.
- **Contradiction** — the hypothesis must be false. → "The stage is empty."
- **Neutral** — could be either. → "The man is famous."

<svg viewBox="0 0 360 74" role="img" aria-label="A premise and hypothesis feed a model that outputs entailment, contradiction, or neutral" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="14" width="96" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="60" y="27" text-anchor="middle">premise</text>
  <rect x="12" y="40" width="96" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="60" y="53" text-anchor="middle">hypothesis</text>
  <path d="M110 24 L150 32" stroke="#1a1a1a" marker-end="url(#e)"/><path d="M110 48 L150 40" stroke="#1a1a1a" marker-end="url(#e)"/>
  <rect x="154" y="26" width="50" height="20" rx="3" fill="#24405e"/><text x="179" y="40" text-anchor="middle" fill="#fff">model</text>
  <path d="M206 36 L242 36" stroke="#1a1a1a" marker-end="url(#e)"/>
  <g font-size="8"><text x="248" y="24">entail</text><text x="248" y="40">contradict</text><text x="248" y="56">neutral</text></g>
  <defs><marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
NLI is quietly load-bearing in 2026. A model that judges "does B follow from A?" is exactly what you need to **check whether an LLM's answer is supported by its retrieved sources** — the core of automated grounding and hallucination detection in RAG. Zero-shot classification also rides on NLI: phrase each candidate label as a hypothesis ("This text is about *sports*") and pick the one the premise most entails.
:::
