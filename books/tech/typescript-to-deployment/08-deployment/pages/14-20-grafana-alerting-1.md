## Alerting from Grafana

- Two places can now raise alerts: **Prometheus rules with Alertmanager, and Grafana's own alerting**. Running both is how a team ends up with duplicate pages

| | Prometheus rules | Grafana alerting |
|---|---|---|
| Defined in | YAML in git | the UI, or provisioned YAML |
| Data sources | Prometheus only | **Prometheus, Loki, SQL, anything** |
| Routing | Alertmanager | built in, or Alertmanager |
| Review | a pull request | a UI change, unless provisioned |

### The recommendation

- **Prometheus rules for anything that pages.** They live in git, they are reviewed, and they keep working when Grafana is down
- **Grafana alerting for what Prometheus cannot see**: a Loki query, a database query, a business number
- **Route both through the same Alertmanager**, so grouping and inhibition apply to everything
