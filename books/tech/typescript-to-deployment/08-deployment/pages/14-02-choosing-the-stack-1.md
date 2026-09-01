## Choosing a monitoring stack

- Three realistic options, and the choice is mostly about **who operates it** rather than what it can do

| | CloudWatch | **LGTM, self-hosted** | SaaS |
|---|---|---|---|
| Components | logs, metrics, alarms, X-Ray | Loki, Grafana, Tempo, Mimir or Prometheus | Datadog, New Relic, Grafana Cloud |
| Operations | none | **a box, and upgrades** | none |
| Cost shape | per GB and per metric | the memory it uses | **per host, and it climbs fast** |
| Query power | Insights, adequate | **PromQL and LogQL, excellent** | excellent |
| Dashboards | basic | **Grafana** | excellent |
| Fits | you are already on AWS | **one box, or cost matters** | a team with a budget and no time |

### The recommendation

- **On a VPS: run the stack yourself.** Prometheus, Grafana, Loki and Alloy fit in about 2 GB and cost nothing per gigabyte
- **On AWS with a small team: CloudWatch.** It is already there, it needs no operating, and the query language is good enough
- **SaaS when the team is large enough that an engineer's month costs more than the bill.** That crossover arrives later than the sales conversation suggests
