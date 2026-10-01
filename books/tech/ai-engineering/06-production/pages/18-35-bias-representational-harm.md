## Bias and representational harm

- Models learn from human data, so they learn human biases — and at scale, reproduce and amplify them. This is not a frontier concern; it is a *shipping-today* harm that affects real users in hiring, lending, healthcare, and content. It is the most common real-world safety failure a production model will actually cause.
- Two harm types, often conflated, need separating because they call for different fixes.

<svg viewBox="0 0 360 90" role="img" aria-label="Allocative harm denies a resource unfairly; representational harm reinforces a demeaning depiction" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="18" width="164" height="64" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="96" y="32" text-anchor="middle" font-size="6.5" fill="#a03050">allocative harm</text><text x="96" y="48" text-anchor="middle" font-size="6">denies a resource/opportunity</text><text x="96" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">rejects a loan, screens out a résumé</text><text x="96" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">by group</text>
  <rect x="184" y="18" width="164" height="64" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="266" y="32" text-anchor="middle" font-size="6.5" fill="#8a6d3b">representational harm</text><text x="266" y="48" text-anchor="middle" font-size="6">reinforces a demeaning image</text><text x="266" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">stereotypes, erasure, skewed</text><text x="266" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">defaults</text>
</svg>

- **Allocative harm** — the model's output *distributes something* unfairly across groups: a résumé screener that downranks certain names, a risk model that denies loans by proxy for a protected trait. Measurable as outcome disparities; the domain of fairness criteria (next pages).
- **Representational harm** — the model *depicts* a group in a demeaning or skewed way: defaulting "doctor" to one gender, stereotyping in generated text or images, erasing groups from outputs. Harder to quantify, but corrosive at scale because the model shapes how millions see the world.
- **Where bias enters.** Training data (reflects historical inequity), labelling (rater bias), objective (optimising aggregate accuracy hides subgroup failure), and deployment (a use context the model was never fair for). Fixing one source does not fix the others.

:::note
Bias is where "AI safety" is most concrete and least speculative — it harms real people now, in regulated domains, and it is the failure most likely to become *your* legal and reputational problem. It also cannot be fully "solved," only measured and managed against an explicit fairness definition, because — as the next two pages show — different reasonable definitions of fairness are mathematically incompatible. The engineering job is to name the fairness goal for the specific use, measure against it, and monitor it, not to claim the model is "unbiased."
:::
