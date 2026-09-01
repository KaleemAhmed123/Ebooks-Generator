## Prometheus - continued

- job_name: docker
    static_configs: [{ targets: ['cadvisor:8080'] }]
```

### The operational facts

```bash
promtool check config monitoring/prometheus.yml
promtool check rules monitoring/rules/*.yml
curl -X POST http://localhost:9090/-/reload            # apply without restarting
curl -s localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {job:.labels.job, health}'
```

- **`promtool check` before every reload.** A bad rule file silently stops all rule evaluation
- **Retention is by time and size, whichever comes first.** Set both, or the disk decides
- **Prometheus stores locally and is not clustered.** For long retention, remote-write to Mimir or a hosted backend. On one box, 30 days is plenty
