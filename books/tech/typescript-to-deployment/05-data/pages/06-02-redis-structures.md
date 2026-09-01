## Using the right structure

- Treating Redis as a place to put JSON strings wastes most of it
- Each data type removes a problem you would otherwise solve with application code and a race condition

| Type | Solves |
|---|---|
| String with `INCR` | counters and rate limits, atomically |
| Hash | an object where single fields are updated |
| Set | membership and deduplication |
| Sorted set | leaderboards, delayed queues, sliding windows |
| List | simple FIFO queues |
| Stream | an append-only log with consumer groups |
| HyperLogLog | approximate unique counts in 12KB regardless of volume |

### A sliding window rate limiter

```ts
const now = Date.now()
const key = `rl:${sellerId}`

await redis
  .multi()
  .zremrangebyscore(key, 0, now - 60_000)
  .zadd(key, now, `${now}-${Math.random()}`)
  .zcard(key)
  .expire(key, 60)
  .exec()
```

- Drop entries older than the window, add this one, count what remains
- A fixed-window counter allows double the limit across a boundary. This does not

### The rule

- **Every key gets a TTL.** Redis holds everything in memory, and a key with no expiry is retained until it evicts something that mattered
