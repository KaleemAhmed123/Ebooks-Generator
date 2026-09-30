## FinOps for LLMs

- **FinOps** is the practice of making cloud spend visible, attributable, and controllable. LLMs make it urgent: token cost scales linearly with usage and can hit five or six figures a month, and unlike a fixed server bill it moves with every prompt change and traffic swing.
- The discipline is three moves: **attribute** (know where the money goes), **budget** (cap and alert), **optimise** (apply the levers from cluster G).

<svg viewBox="0 0 360 88" role="img" aria-label="Cost attribution breaks spend down by team, feature, model, and user; budgets alert; optimisation levers cut it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="20" width="96" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="60" y="16" text-anchor="middle" font-size="6.5" fill="#24405e">attribute</text>
  <g font-size="6"><text x="20" y="36">· per team</text><text x="20" y="48">· per feature</text><text x="20" y="60">· per model</text><text x="20" y="70">· per user</text></g>
  <rect x="128" y="20" width="96" height="52" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="176" y="16" text-anchor="middle" font-size="6.5" fill="#8a6d3b">budget</text>
  <g font-size="6"><text x="136" y="36">· monthly cap</text><text x="136" y="48">· burn-rate alert</text><text x="136" y="60">· hard limit</text><text x="136" y="70">· per-key quota</text></g>
  <rect x="244" y="20" width="104" height="52" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="16" text-anchor="middle" font-size="6.5" fill="#1a3a2a">optimise</text>
  <g font-size="6"><text x="252" y="36">· quantise (17-39)</text><text x="252" y="48">· cache (17-41/42)</text><text x="252" y="60">· route (17-44)</text><text x="252" y="70">· batch tier (17-43)</text></g>
</svg>

- **Attribution is the foundation** — you cannot cut a cost you cannot see. Stamp every request at the gateway with `team`, `feature`, `model`, and `user`, so the bill breaks down by dimension. The hyperscalers offer native surfaces for this (Bedrock inference profiles, Vertex+BigQuery, Azure scopes; 17-03).
- **Budgets are guardrails, not reports.** A monthly cap with a burn-rate alert catches a runaway loop or a viral feature *before* it prints a $50k bill, and per-key quotas stop one team's bug from draining the shared budget.

:::interview
**"Our LLM bill is up 5× this month — walk me through it."** First **attribute**: break the spend down by feature/model/user from the gateway's cost tags — a 5× jump is almost always one dimension (a new feature, a retry storm, a jailbroken loop, a model swap to a pricier tier). Then **quantify** the driver in tokens, not dollars, to see whether it is more requests or more tokens per request. Then **fix** with the matching lever — cache a repeated prefix, route easy traffic down, move offline jobs to batch, or cap the runaway key. The order — attribute, quantify, then optimise — is the answer; jumping straight to "use a cheaper model" is the junior move.
:::
