## Error budgets

- An SLO of 99.9% is also a permission: it says **0.1% is allowed to fail.** That allowance is the **error budget** — `1 − SLO` — and it turns reliability from an argument into arithmetic. Over 30 days, 99.9% leaves about **43 minutes** of budget; 99.95% leaves ~22 minutes; 99.99% leaves ~4.3 minutes. The budget is a *quantity you spend*.

:::mint
```text
SLO 99.9% over 30d  →  error budget = 0.1% ≈ 43m 12s
SLO 99.95%          →  ≈ 21m 36s
SLO 99.99%          →  ≈  4m 19s
```
:::

- What it's *for* is ending the eternal dev-vs-ops fight. Developers want to ship; operators want stability; the error budget decides between them **with data**, not politics:
  - **Budget remaining** → you're reliable enough, so **ship** — launch features, take deployment risk, move fast. Unused reliability is wasted velocity.
  - **Budget exhausted** → you've spent your allowance, so **freeze features** and spend effort on reliability (fix the flaky dependency, add the retry, harden the deploy) until the budget recovers.
- This reframes failure. A little failure isn't a crisis to eliminate at all costs — it's **budget you chose to spend**, perhaps on a risky-but-valuable launch. The question stops being "was there any downtime?" and becomes "are we spending the budget on things worth it?"

<svg viewBox="0 0 360 64" role="img" aria-label="A gauge of the error budget: when budget remains, ship features; as it is spent it crosses into a zone where the policy is to freeze and focus on reliability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="24" width="220" height="16" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="130" y="36" text-anchor="middle" font-size="6" fill="#2f7d4f">budget remaining → SHIP</text>
  <rect x="240" y="24" width="100" height="16" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="290" y="36" text-anchor="middle" font-size="6" fill="#c0392b">spent → FREEZE</text>
  <text x="20" y="54" font-size="5.4" fill="#777">deploys, latency, outages all draw down the same 0.1% budget</text>
</svg>

:::note
Alert on the budget's **burn rate**, not just the raw SLO. A **fast burn** (spending days of budget in an hour) pages immediately — something's badly broken now. A **slow burn** (quietly over-spending across a week) is a ticket, not a 3am page. Multi-window burn-rate alerts (Google SRE's method) catch both the sudden outage and the slow bleed while **suppressing noise** from a brief blip that self-recovers — the foundation of the symptom-based alerting on the next pages.
:::
