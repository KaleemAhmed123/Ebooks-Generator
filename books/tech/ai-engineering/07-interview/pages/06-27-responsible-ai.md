## What does "responsible AI" look like in a production system, concretely?

- Not a policy document — a set of **engineered controls** across the lifecycle:
  - **Safety guardrails** — input/output filtering for harmful content, PII, and policy violations; fail closed on high-risk paths.
  - **Fairness** — test for disparate performance across user groups; monitor for biased outcomes, not just average accuracy.
  - **Transparency** — tell users they're interacting with AI; cite sources where claims matter; document the system (model/system cards).
  - **Privacy** — minimise and protect personal data; honour deletion/residency; avoid training on user data without consent.
  - **Human oversight** — approval gates and escalation for consequential decisions; don't fully automate high-stakes calls.
  - **Accountability** — logging/audit trails, clear ownership, an incident path, and a way for users to contest/report.
- Tie to **regulation** (EU AI Act risk tiers, sector rules) where applicable, and bake checks into CI/monitoring so they're enforced, not aspirational.

:::interview
What's really being tested: that responsible AI is concrete controls (guardrails, fairness tests, transparency, privacy, oversight, audit) wired into the system and CI — not a slogan or a one-off review.
:::
