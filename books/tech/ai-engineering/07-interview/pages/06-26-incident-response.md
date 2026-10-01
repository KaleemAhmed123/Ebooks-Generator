## An AI feature is producing harmful or badly wrong outputs in production. What's your response?

- Treat it like any incident, with AI-specific steps:
  - **Stop the bleeding first** — flip to a safe fallback: the previous model/prompt version, a stricter guardrail, a conservative canned response, or disable the feature. Rollback beats debugging live.
  - **Contain scope** — is it all traffic or a segment (a tenant, a language, a prompt path)? Narrow the blast radius; you may only need to gate part of it.
  - **Diagnose from traces** — use logged prompt/model/retrieval versions to find what changed: a model update, a prompt deploy, a poisoned document, a new input pattern, an injection.
  - **Fix at the root** — correct the prompt/model/retrieval; add a guardrail or eval case that would have caught it.
  - **Prevent recurrence** — add the failing case to the golden set and CI; tighten the rollout gate that let it through.
- AI-specific: because outputs are probabilistic, add a **detection** mechanism (quality/guardrail monitoring) so next time you find out before users do, and keep a human escalation path for harm.

:::interview
What's really being tested: rollback-first instinct, trace-driven root-causing (what config changed), and closing the loop with an eval case + tighter gate — standard SRE adapted to probabilistic AI.
:::
