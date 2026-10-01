## Unit economics

- Cost-per-token (17-56) is the infrastructure metric. The *business* metric is **cost per outcome** — per resolved support ticket, per completed task, per active user, per dollar of revenue enabled. This is the number that decides whether an LLM feature is viable, and it's what a CFO and a staff interviewer actually ask about.

:::mint
```text
Support deflection bot:
  cost/conversation (from 17-56, optimised)   ≈ $0.022
  conversations/resolved-ticket (avg 1.4)     -> cost/resolution ≈ $0.031
  vs human agent cost/resolution              ≈ $6.00
  => ~200× cheaper per resolution — clearly viable

Coding assistant:
  cost/developer/month (tokens)               ≈ $8
  value: measured time saved × loaded dev cost -> $$$
  => viable if it saves even ~15 min/month
```
:::

- **Tie cost to the unit the business cares about**, not tokens. "$0.022 per conversation" means nothing to a product owner; "$0.03 per resolved ticket vs $6 for a human" is a decision. The conversion — conversations per resolution, tasks per outcome — is where the real analysis lives, and it's often dominated by the *failure/retry* rate, not the per-call cost.
- **The dangerous unit economics** are the ones that scale badly: a cost-per-outcome that *rises* with usage (an agent that loops more on harder tasks), or where a small quality drop tanks the outcome rate (a cheaper model that resolves fewer tickets, so cost-per-*resolution* goes up even as cost-per-call goes down).

:::interview
"Is this LLM feature worth shipping?"

Answer in **cost per outcome**, not cost per token. I'd compute cost-per-resolved-ticket (or per completed task, per active user) — which means dividing the per-call cost by the *success rate*, because failed and retried attempts still cost money — and compare it to the alternative (a human, the status quo, or nothing). A feature at $0.03/resolution vs $6/human resolution is obviously viable; one where a cheaper model cuts cost-per-call but drops the resolution rate can actually cost *more* per outcome. The senior move is refusing to evaluate an LLM feature on token cost alone — the business unit and the success rate are what determine viability.
:::
