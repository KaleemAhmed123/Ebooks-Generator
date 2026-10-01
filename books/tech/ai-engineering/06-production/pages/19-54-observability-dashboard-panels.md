## Observability dashboard: panels and alerts

- With spans flowing, the dashboard is the seven golden signals (17-46) turned into panels, all at percentiles, with alerts on the ones that page you.

| Panel | Query over spans | Alert |
|---|---|---|
| latency | P50/P95/P99 of TTFT, TPOT, e2e | P95 > SLO |
| traffic | requests/s, tokens/s | anomaly vs baseline |
| errors | 5xx + timeouts + schema-fails / total | rate climbing |
| cost | Σ cost by feature/user/day | budget burn rate |
| quality | sampled LLM-judge score | drop vs baseline |
| safety | Llama Guard block count | anomaly |
| top slow traces | traces sorted by e2e | (drill-down) |

- **Percentiles, not averages** (17-46) — the P99 trace is the churning user, and the dashboard must surface it, plus a *drill-down* from a bad metric to the actual slow/failed trace with its (redacted) prompt and output. A dashboard you can't click through to the offending trace only tells you *that* something's wrong, not *what*.
- **Alert on rates over windows, not single events** (17-51) — LLM systems are nondeterministic, so one slow request is noise; a *rate* breaching the SLO over a window is signal. Page only on SLO breaches; everything else is a dashboard, not a 3am wake-up.

:::interview
"What does an LLM observability dashboard need that a normal APM dashboard doesn't?"

Two axes ordinary APM lacks: **cost** and **quality**. Every span carries token counts and computed cost, so the dashboard rolls up spend by feature/user and alerts on burn rate — because LLM cost is unbounded and a runaway loop is a financial incident. And a **live quality panel** from sampled LLM-judge scoring, because a model or prompt change can degrade answers with zero errors and normal latency — the silent regression a latency-and-errors dashboard is blind to. Plus a **safety** panel (block counts). Keep the classic four golden signals at P95/P99 with trace drill-down, and *add* cost, quality, and safety — those three are the LLM-specific difference.
:::
