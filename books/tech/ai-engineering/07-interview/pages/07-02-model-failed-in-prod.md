## "Tell me about a time an AI feature failed in production."

- **What they're screening for:** how you handle the inevitable — AI systems fail probabilistically — and whether you build to detect, contain, and learn.
- **A strong answer shows:**
  - **How you found out** — ideally monitoring/eval caught it, not an angry user (and if it was a user, you then *added* detection).
  - **Containment first** — rollback/fallback to stop harm before debugging.
  - **Root cause** — traced via logs/versions (a silent model update, drift, a bad prompt deploy, an injection).
  - **The fix and the prevention** — corrected the cause *and* added an eval case/guardrail so it can't recur silently.
  - **Ownership** — you took responsibility, no blame-shifting.
- Pick a real, specific failure with a concrete resolution.

:::warn
Weak: "A model gave a bad answer once, we fixed the prompt." Strong: names the detection gap, the rollback, the trace-based root cause, and the regression test added — showing a systematic, blameless process.
:::

:::interview
What's really being tested: maturity about AI's probabilistic failure — detect, contain, root-cause, prevent — and ownership, not that you've never failed.
:::
