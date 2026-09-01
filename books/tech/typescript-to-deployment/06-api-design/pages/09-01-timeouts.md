# Module 9 - Resilience between services

## Timeouts

- The single most valuable line of defensive code in a distributed system, and the one most often missing
- A call with no timeout does not fail. It **waits**, holding a connection, a thread of work and the caller behind it
- One slow dependency then fills every connection in your pool, and a service that is merely slow takes yours down completely
- That is a **cascading failure**, and it is why an outage often starts somewhere you do not own

```ts
const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
```

### Choosing the number

- Base it on the dependency's p99 latency, not on how long you are willing to wait
- A call that normally takes 50ms and is given a 30 second timeout is unprotected for 29.95 seconds
- Two to three times p99 is a reasonable starting point

### Timeout budgets

- If your caller waits 3 seconds, everything you do must finish inside 3 seconds, including retries
- Three calls with 2 second timeouts and two retries each can reach 12 seconds, and your caller left long ago
- Pass the remaining budget down, and let each hop take less than the one above it

### Every layer needs one

- HTTP client, database query, cache, queue publish, and the whole request at the server
- A database client with no `statement_timeout` will happily run a query for an hour
