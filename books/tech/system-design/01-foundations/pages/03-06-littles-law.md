## Concurrency = throughput × latency

- **Little's law** (1961): in any stable system, the average number of items in flight equals the arrival rate times the average time each spends in the system

```
L = λ × W

1,000 req/s  ×  50 ms  =  50 requests in flight
```

- That number — 50 — is the connection pool size, the thread count, the socket backlog, the concurrency limit you need. It is derived, not guessed
- The law holds for any stable queue: a database connection pool, an HTTP server, a Kafka consumer group

### When latency moves, everything moves

- Latency doubles under load (queuing, GC, slow queries). Now 1,000 req/s × 100 ms = 100 in flight
- If the pool was sized for 50, the 51st request waits. Its latency grows, which grows L, which makes more requests wait — a feedback loop
- The fix is not "make the pool bigger." The fix is either reduce W (faster queries, caching) or reduce λ (shed load, rate limit)

### The failure

- A connection pool of 20, serving 500 req/s with a 30 ms query time. L = 15, well within the pool. Then a slow query at 200 ms during a burst: L = 100, the pool is empty, everything queues, and the queue makes it worse
- Size the pool from the **peak** latency, not the median. And set a timeout on the pool wait, so the feedback loop breaks
