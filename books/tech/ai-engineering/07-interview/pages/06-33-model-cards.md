## What are model/system/dataset cards, and why do they matter?

- They're **structured documentation** of an AI component, so users and auditors know what it is, how it was built, and where it should and shouldn't be used.
  - **Model card** — the model's intended use, training data overview, evaluation results (including per-group/fairness), known limitations, and risks.
  - **System card** — the whole deployed system (model + guardrails + retrieval + policies), its safety evaluations, and residual risks. Used for frontier-model launches.
  - **Dataset card / datasheet** — a dataset's contents, collection method, consent/licensing, biases, and intended use.
- Why they matter:
  - **Governance/compliance** — regulations and procurement increasingly require them.
  - **Responsible use** — they prevent misuse by stating out-of-scope uses and limitations explicitly.
  - **Reproducibility & accountability** — a record of what was built, tested, and found.
- For an engineer: maintain them as living docs tied to versions, with real eval numbers — not marketing.

:::interview
What's really being tested: that you know the card types and their purpose (transparency, governance, preventing misuse) and would keep them as versioned, evidence-backed documentation.
:::
