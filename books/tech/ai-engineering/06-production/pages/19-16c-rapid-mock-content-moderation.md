## Rapid mock: content moderation at scale

- **Prompt:** "Design content moderation for a platform with millions of posts a day." **Clarify:** text + images, low latency (posts appear fast), policy has many categories, appeals required, false positives and negatives both costly.
- This is Module 18's moderation pipeline (18-44) as a scale system, and the design is a **cascade** (17-44) to control cost.

<svg viewBox="0 0 360 66" role="img" aria-label="Moderation cascade: cheap classifier filters most, uncertain cases escalate to an LLM, borderline to humans" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="24" width="60" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="38" y="35" text-anchor="middle">cheap classifier</text>
  <rect x="86" y="10" width="70" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="121" y="20" text-anchor="middle" font-size="5.5">clear → auto-decide (95%)</text>
  <rect x="86" y="30" width="70" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="121" y="40" text-anchor="middle" font-size="5.5">uncertain → LLM (4%)</text>
  <rect x="86" y="50" width="70" height="14" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="121" y="60" text-anchor="middle" font-size="5.5">borderline → human (1%)</text>
  <path d="M68 30 L84 17 M68 32 L84 37 M68 34 L84 57" stroke="#888" marker-end="url(#cm2)"/>
  <defs><marker id="cm2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The cascade controls cost at volume.** A cheap fast classifier (Llama Guard, Perspective) auto-decides the clear majority; only *uncertain* cases escalate to an expensive LLM judge; only *borderline* cases reach human reviewers. You can't afford an LLM on every one of millions of posts, so difficulty-routing is mandatory (17-44).
- **Multimodal** needs image classifiers too (a harmful image with clean text, 18-17). **Appeals** feed a human decision back to improve the classifier (18-44). Both error types tracked and tuned per category.

:::interview
"How do you moderate millions of posts a day affordably?"

A **cascade**: a cheap fast classifier auto-decides the ~95% clear cases, an LLM judge handles the uncertain few percent, and humans see only the borderline ~1% — because running an LLM on every post is unaffordable at that volume, so you spend expensive compute only where difficulty demands it. Screen text *and* images (harm hides in either), tune per-category thresholds to the stakes (both false positives and negatives cost), and feed **appeal** overturns back into the classifier. The cascade-for-cost plus per-category threshold tuning is the scale answer; "run a classifier on everything" ignores the economics.
:::
