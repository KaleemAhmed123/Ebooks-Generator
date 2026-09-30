## Coreference resolution

- **Coreference resolution** figures out which words point to the same real-world thing across a text — mostly pronouns back to their nouns.
- *"**Sarah** dropped **her** phone because **she** was rushing."* — `her` and `she` both refer to `Sarah`. A human resolves this instantly; a machine must be taught.

<svg viewBox="0 0 360 66" role="img" aria-label="Arrows link the pronouns her and she back to the name Sarah" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="40" y="44" font-weight="bold" fill="#24405e">Sarah</text><text x="120" y="44">dropped</text><text x="195" y="44" fill="#c0392b">her</text><text x="230" y="44">phone,</text><text x="300" y="44" fill="#c0392b">she</text>
  <path d="M200 32 Q140 8 55 32" fill="none" stroke="#c0392b" marker-end="url(#co)"/>
  <path d="M305 32 Q180 2 55 34" fill="none" stroke="#c0392b" marker-end="url(#co)"/>
  <defs><marker id="co" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- Why it matters: without it, downstream tasks lose the thread. A summarizer, a search index, or a knowledge-graph builder that cannot tell `she` means `Sarah` mis-attributes every fact after the first pronoun.

:::warn
Coreference is where **ambiguity and bias** surface. *"The doctor told the nurse that she was late"* — who is *she*? The text alone does not say; the model guesses from statistical patterns in its training data, and those patterns carry gender stereotypes (the Winograd schema tests exactly this). Large transformers handle coreference implicitly and far better than the old rule-based resolvers, but they inherit the bias — never trust a coreference call on high-stakes text without a human check.
:::
