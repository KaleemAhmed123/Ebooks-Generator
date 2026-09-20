## Little's law and the queue

- **Little's law** (1961): in any stable system, the number of items in flight equals the arrival rate times the time each spends inside

```
L = λ × W

1,000 req/s  ×  50 ms  =  50 requests in flight
```

- That 50 is the pool size, the thread count, the concurrency limit. Derived, not guessed
- Latency doubles under load, so in-flight doubles: a pool sized for 50 has 100 waiting, and waiting adds latency

### Wait time explodes near full

- For one server with random arrivals, the response time is the service time × 1 ÷ (1 − ρ), where ρ is **utilisation**, the fraction of capacity in use

| Utilisation | Response time, as a multiple of service time |
|---|---|
| 50% | 2× |
| 90% | 10× |
| 99% | 100× |

- At 90% a 5 ms query costs the user 50 ms; at 99%, 500 ms. The box is not overloaded. It has 1% headroom, where the curve is vertical

### The failure

- Capacity planned for the average. Average is 70%, which looks fine. Peak is 92%, response time is 12× the service time, almost four times what it was at 70%, the SLO breaks, and the post-mortem says "we had headroom"
- A pool of 20 at 500 req/s and 30 ms: L = 15. One 200 ms query in a burst: L = 100, the pool is empty, everything queues. Size from peak latency, and time out the pool wait

:::interview
"How much headroom would you leave?" is a queueing question. Name a target (60–80%), then say what happens past it: the curve above.
:::
