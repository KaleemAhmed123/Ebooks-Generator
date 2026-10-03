## Logs: structured and correlated

- A log line written for a human to read — `User 4821 failed to check out because payment declined` — is nearly useless at scale: you can't filter, aggregate, or join it. **Structured logging** emits each event as **key/value data** (JSON), so logs become a queryable dataset instead of prose you grep.

:::mint
```json
{"ts":"2026-10-03T12:01Z","level":"error","msg":"checkout failed",
 "user_id":4821,"reason":"payment_declined","amount":59.9,
 "trace_id":"4bf92f3577b34da6","service":"checkout"}
```
:::

- Now you can ask real questions — "error rate by `reason` in the last hour," "all events for `user_id=4821`," "p99 of `amount` on declined checkouts" — because the fields are typed and indexed. The same event as a sentence answers none of them without a regex per question.
- The field that makes logs part of an observable system is **`trace_id`** (Module 1.4): stamp every log with the current request's trace ID and a log jumps straight to its trace, and a trace to its logs. Logs stop being an island; they become the *detail view* of a request you found via metrics and traces (Module 1.1's correlation).
- Discipline that keeps logs affordable and useful: **levels** used honestly (ERROR = a human must look; INFO = normal milestones; DEBUG = off in prod), **no secrets or PII** in log bodies (they're retained and widely readable — Booklet 11), and **sampling** high-volume INFO logs so cost and noise stay bounded. Logs are the most expensive signal per byte; spend the budget on the events that carry information.

:::warn
Logging inside a hot loop or per-request at DEBUG in production is a classic self-inflicted outage: the logging itself becomes the bottleneck — synchronous disk/network writes block the request path, and the log pipeline (and its bill) is flooded. The symptom is latency that rises with traffic and a log backend falling over *during* the incident you're trying to debug. Log events, not iterations; sample the chatty paths; make logging asynchronous.
:::
