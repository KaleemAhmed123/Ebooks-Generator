## Alertmanager - continued

- **Grouping.** Twenty targets going down sends one message, not twenty. `group_by` decides what counts as the same incident
- **Inhibition.** If the whole service is down, do not also page about its error rate. **This is what stops one outage becoming forty notifications**

### Silencing during a deploy

```bash
amtool silence add alertname=HighErrorRate service=orders-api \
  --duration=15m --comment='deploying abc123' --alertmanager.url=http://localhost:9093

amtool silence query
amtool silence expire <id>
amtool alert query --alertmanager.url=http://localhost:9093
```

- **Put the silence in the deploy script**, and expire it when the deploy verifies. A silence someone forgets is worse than the noise
