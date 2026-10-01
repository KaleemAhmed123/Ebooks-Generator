## "How do you work with non-ML engineers and cross-functional partners on AI?"

- **What they're screening for:** collaboration and translation — AI features ship with backend, frontend, product, design, and sometimes legal, most of whom don't think probabilistically.
- **A strong answer shows:**
  - **Translate, don't jargon-dump** — explain AI behaviour (non-determinism, latency, failure modes) in terms each partner needs: product cares about UX of errors, backend about latency/cost/contracts, legal about data/privacy.
  - **Set shared expectations early** — everyone must understand the feature is probabilistic and needs eval/monitoring, so it's designed in, not bolted on.
  - **Define clean interfaces** — a stable API contract so non-ML engineers integrate without needing to understand the model internals.
  - **Bring design in on the UX of uncertainty** — how to show confidence, citations, errors, and fallbacks.
  - **Pull in legal/privacy** for data flows early, not at launch.
- The theme: you're the **bridge** who makes AI's quirks legible and plannable for the whole team.

:::warn
Weak: "I build the model and hand it off." Strong: translate probabilistic behaviour per audience, align on eval/monitoring up front, define a clean contract, and co-design the error UX with design/product.
:::

:::interview
What's really being tested: cross-functional collaboration — translating AI's probabilistic nature for each partner and designing the integration/UX/data concerns in from the start.
:::
