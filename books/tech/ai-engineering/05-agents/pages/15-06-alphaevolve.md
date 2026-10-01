## AlphaEvolve: evolving algorithms

- **AlphaEvolve** (DeepMind, 2025) uses an LLM inside an **evolutionary loop** to discover new algorithms and optimizations — and produced results good enough to be *deployed* and to improve on long-standing human bests. It is self-improvement pointed at code and math, with a machine-checkable evaluator. **[VERIFY specifics]**

<svg viewBox="0 0 360 96" role="img" aria-label="AlphaEvolve: LLM proposes program variants, an automated evaluator scores them, the best survive and are mutated further" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="38" width="76" height="24" rx="3" fill="#24405e"/><text x="48" y="47" text-anchor="middle" fill="#fff" font-size="6">LLM mutates</text><text x="48" y="56" text-anchor="middle" fill="#cdd" font-size="5">program variants</text>
  <rect x="112" y="38" width="76" height="24" rx="3" fill="#a03050"/><text x="150" y="47" text-anchor="middle" fill="#fff" font-size="6">auto-evaluate</text><text x="150" y="56" text-anchor="middle" fill="#fc8" font-size="5">measure quality</text>
  <rect x="214" y="38" width="76" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="252" y="47" text-anchor="middle" font-size="6">keep best</text><text x="252" y="56" text-anchor="middle" font-size="5" fill="#6b6b6b">in a population</text>
  <rect x="308" y="38" width="44" height="24" rx="3" fill="#24405e"/><text x="330" y="53" text-anchor="middle" fill="#fff" font-size="6">new algo</text>
  <path d="M86 50 L110 50" stroke="#888" marker-end="url(#ae)"/><path d="M188 50 L212 50" stroke="#888" marker-end="url(#ae)"/><path d="M290 50 L306 50" stroke="#888" marker-end="url(#ae)"/><path d="M252 62 Q252 88 48 84 L48 64" stroke="#888" fill="none" marker-end="url(#ae)"/>
  <defs><marker id="ae" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop:** an LLM proposes **mutations** to a program (a candidate algorithm); an **automated evaluator** runs it and measures quality (speed, correctness, a metric); the best variants survive into a population and are mutated further (14-17). Over many generations, the population evolves better and better algorithms — the LLM supplies creative variation, the evaluator supplies selection pressure.
- **Why it produced *real* discoveries:** because the evaluator is **objective and executable** (run the algorithm, measure it), the loop cannot fool itself — an improvement is a *measured* improvement. It reportedly found faster routines for practical problems and matrix-multiplication improvements, some deployed in production. This is self-improvement that pays for itself.
- **The key lesson:** LLM creativity + rigorous automated evaluation + evolutionary search = genuine discovery, *in domains where quality is measurable*. The LLM alone would hallucinate; the evaluator alone cannot create; together they search the space of programs far beyond what either does alone.

:::interview
"How did AlphaEvolve discover new algorithms — isn't that just an LLM guessing?"

No — it's evolutionary search with an LLM as the mutation operator and an *executable* evaluator as the selection pressure. The LLM proposes program variants; an automated evaluator runs each and measures its quality; the best survive and get mutated further, over many generations. The objective evaluator is what makes it real rather than hallucination — every kept improvement is a measured one. It works precisely because algorithm quality is machine-checkable, which is the recurring precondition for self-improvement: a trustworthy verifier.
:::
