## Alerting from Grafana - continued

```yaml
# provisioning/alerting/rules.yml, so it stays in git
apiVersion: 1
groups:
  - orgId: 1
    name: business
    folder: alerts
    interval: 5m
    rules:
      - title: No orders in 30 minutes
        condition: C
        data:
          - refId: A
            datasourceUid: prom
            model: { expr: 'increase(orders_created_total[30m])' }
        for: 10m
        labels: { severity: page }
        annotations:
          summary: 'No orders created in 30 minutes'
```

### The alert that catches what nothing else does

- **A business metric going to zero.** Every technical metric can be green while checkout is broken by a frontend deploy
- Orders created, signups, payments succeeded, messages sent. **One of these, alerted on absence, catches whole classes of outage that infrastructure monitoring misses**
- **Beware the daily cycle.** Zero orders at 4am is normal. Compare against the same hour last week, or only alert during known-busy hours
