### The review, within a week

```markdown
# Incident: elevated 5xx on orders API, 2026-08-31

## Impact
22 minutes. ~4,100 failed requests. 340 customers affected.

## Timeline
14:00  Deploy abc123 (adds payout retry worker)
14:02  Error rate crosses 1%
14:05  Alert fires. Investigation starts
14:11  Deploy identified as likely cause
14:14  Rolled back to previous release
14:22  Recovered

## Cause
The new worker opened a Redis connection per job and never closed it.
Redis hit maxclients at ~4,000 connections; the API could not reach it.

## Why it was not caught
- Staging runs one worker at low volume, so the leak took days to appear there
- No alert on Redis connected_clients

## Actions
- [ ] Reuse the shared Redis client in the worker (owner: Kaleem, this week)
- [ ] Alert on redis_connected_clients > 80% of maxclients (owner: Rabiya)
- [ ] Load test workers in staging before merge (owner: Kaleem)
```

### The rules

- **Blameless.** The question is what the system allowed, not who typed it. A review that assigns blame is the last honest one you get
- **Every action has an owner and a date.** "Be more careful" is not an action
- **"Why was it not caught" is the most valuable section.** It is where the missing test, alert or gate is identified
- **Measure time to detect and time to recover.** Both are improvable by engineering; "number of incidents" mostly is not
