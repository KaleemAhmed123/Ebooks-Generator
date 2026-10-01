## "How do you balance shipping fast against evals and safety rigor?"

- **What they're screening for:** mature engineering judgment — not reckless speed, not analysis paralysis, but rigor scaled to risk.
- **A strong answer shows:**
  - **Scale rigor to stakes** — a low-risk internal tool can ship fast with light evals; a user-facing or high-stakes feature needs the full eval/guardrail/rollout treatment. Same team, different bars.
  - **A minimum non-negotiable** — even "fast" needs *some* eval set and basic guardrails; shipping an AI feature with zero evaluation is how you get a public incident.
  - **Lightweight-but-real evals** — a small golden set in CI is cheap and catches the worst regressions; rigor doesn't have to be slow.
  - **Progressive rollout as a speed enabler** — canary lets you ship fast *and* safely because the blast radius is small.
  - **Iterate** — ship a safe thin slice, learn, harden the parts that matter.
- The theme: **risk-proportional rigor** — fast where it's safe, careful where it isn't, never zero.

:::warn
Weak: "Move fast and fix later" (incidents) or "nothing ships without exhaustive evals" (nothing ships). Strong: scale rigor to risk, keep a cheap non-negotiable eval + canary, and iterate.
:::

:::interview
What's really being tested: that you right-size rigor to risk (with a non-negotiable minimum) and use canary/light evals to be both fast and safe — not a false speed-vs-safety binary.
:::
