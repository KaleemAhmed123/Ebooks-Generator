## Compound Index & ESR Rule

Order the keys of a compound index as **E**quality, then **S**ort, then
**R**ange. Getting it wrong forces an in-memory sort.

A query filtering `status`, sorting by `createdAt` and ranging on `score` is
served completely by `{status: 1, createdAt: -1, score: 1}`.

Equality first narrows the index to an exact slice. Sort next means that slice
already arrives in order. Range last is scanned inside it. Put the range before
the sort and a `SORT` stage appears in `explain()`.

## Connection Pooling

*PgBouncer*

Postgres forks a process per connection, so thousands of clients exhaust the
machine. A pooler multiplexes many of them onto few server connections.

Two hundred serverless functions holding five connections each is a thousand,
well past `max_connections`. PgBouncer fronts them with twenty real ones.

| Mode | Reuses a connection | Cost |
|---|---|---|
| Session | for the whole client session | 1:1, barely helps density |
| Transaction | per transaction | best density; breaks prepared statements and advisory locks |

Transaction mode is the one worth having, and what it breaks fails at runtime
rather than at connect.
