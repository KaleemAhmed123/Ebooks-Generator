## Rapid mock: LLM experimentation platform

- **Prompt:** "Build the internal platform teams use to experiment with prompts, models, and RAG configs." **Clarify:** many teams, need to compare variants offline and online, track what shipped, reproduce any result, control cost of experiments.
- This is the *meta-meta* system — the tooling that makes every other LLM product improvable. It's eval (Flagship 16) + prompt management (17-44a) + observability (19-53) assembled as a platform.

- **The core capabilities.** A **prompt/config registry** (versioned variants, 17-44a); an **offline eval runner** (compare variants on eval sets, Flagship 16); an **online experiment framework** (A/B variants on live traffic with outcome metrics, 17-49); a **trace store** to reproduce any result (19-53); and **cost controls** so experiments don't blow the budget (per-experiment quotas, 17-55).
- **Reproducibility is the platform's promise.** Every experiment records its exact config (prompt version, model, RAG settings, eval set) and its results, so any number can be reproduced and any shipped change traced to the experiment that justified it. Without this, teams re-run the same experiments and ship changes nobody can explain.

:::interview
"What would an internal LLM experimentation platform provide?"

The tooling that makes LLM products systematically improvable, composed from pieces this booklet built: a **versioned prompt/config registry** (17-44a), an **offline eval runner** to compare variants on curated sets (Flagship 16), an **online A/B framework** to test variants on live traffic against real outcome metrics (17-49), a **trace store** so any result is reproducible (19-53), and **cost controls** so experimentation doesn't blow the budget. The through-line is **reproducibility** — every experiment records its exact config and results, so changes are traceable to the evidence that justified them. It's a platform because it turns "someone tried a prompt and it seemed better" into "we measured this variant offline, A/B'd it, and shipped on the data" — the discipline that separates teams that improve reliably from teams that guess.
:::
