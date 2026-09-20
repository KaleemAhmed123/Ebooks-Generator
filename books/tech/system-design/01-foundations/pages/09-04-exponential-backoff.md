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

- The **base** controls the starting delay. AWS's 2026 retry update uses 50 ms for transient errors and 1,000 ms for throttling (opt-in as of 2026-09, becoming the default)
- The **cap** prevents the sleep from growing absurdly long. Without a cap, attempt 10 would sleep for 51 seconds, and attempt 20 would sleep for 14 hours

### The failure

- Writing `base * 2^attempt` without a `min(cap, ...)` bound. At attempt 20 the sleep is 14 hours; a few attempts later it is years. The job is not retrying, it is retired
- A flat `sleep(1000)` instead of exponential backoff. It paces the load, but if the outage lasts 30 seconds, a flat 1-second sleep means the client hammers the downed server 30 times. Exponential backoff from a 50 ms base means about 8 times, and every gap is longer than the last
