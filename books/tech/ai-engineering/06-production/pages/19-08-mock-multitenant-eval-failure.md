## Mock: multi-tenant platform — ops and tradeoffs

- **Scale/cost** here is about *pooling*, not a single workload's QPS. The platform's win is that 40 teams' bursty, uncorrelated traffic *aggregates* into steadier utilisation than any one team could achieve alone — so the shared fleet runs at higher utilisation, and the per-token cost falls for everyone. That pooling argument is the platform's reason to exist.
- **Failure modes** are multi-tenancy failures:

| Failure | Response |
|---|---|
| noisy neighbour saturates fleet | per-team quotas + priority lanes + admission control |
| one team's cost explodes | per-team budget cap + burn-rate alert, not a shared blowout |
| a shared model regresses | canary per model, teams pinned to versions they opted into |
| a team needs a model you don't host | provider fallback behind the same gateway |
| a team leaks another's data | strict per-team isolation on caches, adapters, logs |

- **Tradeoffs probed.** *Shared vs dedicated capacity* — pool for cost, but offer dedicated (reserved) lanes for teams with strict SLAs. *Central control vs team autonomy* — the platform enforces safety, budgets, and observability centrally, but lets teams choose models and prompts. *Self-host vs passthrough* — self-host the high-volume shared models, passthrough to providers for the long tail.

:::interview
"Why build a platform instead of letting each team call the provider directly?"

Three things you only get by centralising: **cost** (pooled traffic runs at higher utilisation, and one team's off-peak fills another's peak, so self-hosting the shared models becomes viable), **governance** (one place to enforce safety, budgets, rate limits, and audit — instead of 40 re-implementations that drift), and **attribution** (per-team cost and usage the raw provider bill cannot give you). The cost of the platform is a team that owns it; the payoff is that the 41st team is nearly free to onboard. Naming the pooling/utilisation argument is the economic signal.
:::
