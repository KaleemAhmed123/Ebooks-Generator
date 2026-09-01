## Communicating, and the review

### During

```text
14:05  Investigating elevated errors on the orders API. Started ~14:02.
14:11  Cause looks like the 14:00 deploy. Rolling back.
14:14  Rolled back to abc123. Error rate recovering.
14:22  Recovered. Monitoring. Root cause not yet known.
```

| Rule | Why |
|---|---|
| **update every 15 minutes**, even with nothing new | silence is read as chaos |
| say what you know and what you do not | speculation becomes fact when repeated |
| **one person communicates**, another fixes | context switching costs the fix |
| update the status page | it removes most of the support load |
