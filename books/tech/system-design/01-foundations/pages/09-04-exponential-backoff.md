## Exponential backoff

- To prevent a retry storm, clients must wait before retrying. They must wait *longer* after each successive failure. This gives the server time to recover

```
sleep = min(cap, base × 2^attempt)
```

| Attempt | Sleep (base 50 ms) |
|---|---|
| 0 (first try) | - |
| 1 (first retry) | 100 ms |
| 2 | 200 ms |
| 3 | 400 ms |

- The **base** controls the starting delay. AWS SDKs default to 50 ms for transient errors, but a much longer 1,000 ms for throttling errors
- The **cap** prevents the sleep from growing absurdly long. Without a cap, attempt 10 would sleep for 51 seconds, and attempt 20 would sleep for 14 hours

### The failure

- Writing `base * 2^attempt` without a `min(cap, ...)` bound. A background job fails overnight. By morning, it is scheduled to retry in 2038
- A flat `sleep(1000)` instead of exponential backoff. It paces the load, but if the outage lasts 30 seconds, a flat 1-second sleep means the client hammers the downed server 30 times. Exponential backoff means it hammers it 5 times
