## "How do you decide a model is 'good enough' to ship?"

- **What they're screening for:** that you ship on a **defined bar tied to the use case**, not on "it feels good" or chasing perfection.
- **A strong answer shows:**
  - **A pre-agreed quality bar** — set with stakeholders from the cost of errors: a creative-writing assist can ship at lower accuracy than a medical summariser.
  - **Measured on a representative eval set** — you hit the bar on real-looking data, not a demo.
  - **Failure mode is acceptable** — crucially, *how* it fails matters as much as how often. A feature that fails safely (says "I don't know", defers to a human) can ship at lower accuracy than one that fails confidently and silently.
  - **Guardrails + monitoring in place** — you ship behind canary with the ability to roll back, and keep improving post-launch.
  - **Ship-and-iterate** — "good enough to learn from real users safely" beats "perfect, someday."
- The judgment: match the bar and the failure-safety to the stakes, then ship and monitor.

:::warn
Weak: "When accuracy is high enough" (undefined) or "when it's perfect" (never ships). Strong: "When it clears the use-case-specific bar on a representative eval, fails safely, and has guardrails + rollback — then ship and iterate."
:::

:::interview
What's really being tested: shipping discipline — a stakes-calibrated bar on representative data, acceptable *failure mode*, and guardrails/monitoring — not perfectionism or vibes.
:::
