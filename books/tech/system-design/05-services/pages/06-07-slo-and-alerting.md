## SLIs, SLOs, and Alerting

- Traditional monitoring alerts on causes: "Page the engineer, CPU is at 90%!" This leads to alert fatigue, because a CPU at 90% doesn't actually mean the users are suffering
- Modern monitoring alerts on symptoms, using Service Level Indicators (SLIs) and Service Level Objectives (SLOs)

| Term | Definition | Example |
|---|---|---|
| **SLI** | What you measure (an indicator of user pain) | The percentage of HTTP GET requests that return 200 OK |
| **SLO** | The target you aim for (your objective) | 99.9% over a 30-day rolling window |
| **Error Budget** | The acceptable failure rate (100% - SLO) | 0.1% (You are allowed to drop 1 request in 1,000) |

- You only page an engineer if the Error Budget is burning so fast that it will be depleted within the next few hours (a high burn rate)

### The failure

- The failure is the "Boy Who Cried Wolf" monitoring setup. A team configures 200 alerts for things like "Queue depth > 50" and "Memory > 80%"
- The pager goes off 10 times a night for issues that resolve themselves. Engineers learn to ignore the alerts. When a real outage happens, the alert is buried in the noise. You should only wake up a human if the user is currently feeling pain
