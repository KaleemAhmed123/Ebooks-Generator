## What should an AI engineer know about regulation like the EU AI Act?

- You don't need to be a lawyer, but you must know that AI products face **real legal obligations** that shape design — and build so compliance is possible. [VERIFY: EU AI Act status/dates.]
- Core ideas of the **EU AI Act** (the leading framework):
  - **Risk-tiered** — obligations scale with risk: **unacceptable** uses are banned; **high-risk** uses (hiring, credit, medical, law enforcement) require risk management, data governance, logging, human oversight, and conformity assessment; **limited-risk** needs transparency (tell users it's AI, label AI content); **minimal-risk** is largely unregulated.
  - **GPAI (general-purpose model) rules** — documentation, copyright, and systemic-risk duties for large models.
- Practical implications for engineers: **logging/audit trails**, **human oversight** hooks, **transparency** (AI disclosure, content labelling/watermarking), **data governance/provenance**, and **documentation** (model/system cards).
- Also map to sector rules (GDPR for data, plus US/UK/other regimes). The point: know your use-case's risk tier and build the required controls in from the start.

:::interview
What's really being tested: awareness that regulation is risk-tiered and imposes concrete engineering requirements (logging, oversight, transparency, documentation) — enough to design compliantly, not legal expertise.
:::
