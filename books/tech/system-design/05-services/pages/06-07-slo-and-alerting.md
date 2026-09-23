## SLIs, SLOs, and error budgets

- Alerting on causes produces pages nobody can act on: CPU at 90 % may be a service working hard or a service dying, and the graph cannot tell the difference. Alerting on symptoms means measuring the thing the user feels and paging when that degrades

| Term | What it is | Worked example |
|---|---|---|
| SLI | the measured indicator of user experience | share of `GET /orders` served under 300 ms with a 2xx |
| SLO | the target for that indicator over a window | 99.9 % over a rolling 30 days |
| Error budget | what the objective permits to fail | 0.1 % — on a 30-day window, 43.2 minutes |

- The budget turns an argument into arithmetic. 30 days is 43 200 minutes, so 99.9 % permits 43.2 of them. Budget left means ship; budget gone means the next change is a reliability change. Nobody has to win a debate about whether the service is "reliable enough"
- Page on the **burn rate** — how fast the budget is being spent — not on the amount left. At ten times the sustainable rate the whole 30-day budget is gone in three days, which is worth waking someone for; a slow drip that recovers is a ticket
- Two windows per alert stop both failure modes: a short one so it fires quickly, and a longer one that must also be burning, so a ninety-second blip does not page

### The failure

- Two hundred alerts on causes. Queue depth over 50, memory over 80 %, a restarted pod — each fires a few times a week, resolves itself, and trains everyone to close the page without reading it
- The cost is not the noise. It is that the one alert that mattered arrives in the same channel, in the same format, at 3 a.m., and gets the same reflex. An alert that does not correspond to a user feeling something should not be able to wake a person, and most alerts are of that kind
