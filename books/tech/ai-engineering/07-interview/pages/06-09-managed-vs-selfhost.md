## Managed API vs self-hosting a model — how do you decide?

- **Managed API** (OpenAI/Anthropic/etc.): no infra, instant access to frontier models, scales for you, pay per token. You trade control, data-governance assurances, and per-token margin.
- **Self-hosting** (open model on your GPUs): full control over data, model, and latency; cheaper **at high steady volume**; needed for strict data residency or custom fine-tunes. You own GPU ops, scaling, and reliability.
- Decision factors:
  - **Volume/utilisation** — low or spiky → managed (no idle bill); high and steady → self-host can win on cost.
  - **Data/compliance** — sensitive data or residency rules may force self-host (or a private managed deployment).
  - **Model needs** — need the absolute frontier model → managed; a tuned open model is enough → self-host.
  - **Team capability** — GPU serving is real ops work; don't self-host without the skills.
- Many teams do **both**: managed for frontier/overflow, self-hosted for high-volume or sensitive paths.

:::interview
What's really being tested: that you weigh volume/utilisation, compliance, model requirements, and ops capability — and know self-host only wins on cost at high steady utilisation.
:::
