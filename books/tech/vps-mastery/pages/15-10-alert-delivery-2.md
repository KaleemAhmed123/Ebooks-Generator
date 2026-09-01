### The dead man's switch

- Every alert so far fires when something is wrong. None fire when the monitoring itself stops

```yaml
- alert: MonitoringAlive
  expr: vector(1)
  labels: { severity: heartbeat }
  annotations: { summary: "monitoring is running" }
```

- Route it to an external service that expects a message every five minutes and alerts on **silence**. Healthchecks.io has a free tier for exactly this
- Without it, a Prometheus that stopped three weeks ago looks identical to a system with no problems

### Include the runbook link

```yaml
annotations:
  runbook: "https://github.com/kaleem/marketplace/blob/main/docs/runbooks/disk-full.md"
```

- The person woken at 3am may not be the person who wrote the alert. A link to five commands is worth more than a well-phrased summary
