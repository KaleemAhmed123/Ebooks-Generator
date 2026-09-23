## Glossary: I–K

| Term | Means | Where |
|---|---|---|
| **idempotency key** | a caller-supplied unique key the server records, so a retry returns the first result instead of repeating the work | 3 · 8-10 |
| **idempotent producer** | a Kafka producer whose per-partition sequence numbers let the broker drop duplicate batches and reject out-of-order ones | 4 · 4-05 |
| **index-only scan** | answering a query from the index leaf alone, never visiting the heap | 2 · 3-04 |
| **in doubt** | a two-phase commit participant that has voted yes and cannot learn the outcome, holding its locks until the coordinator returns | 3 · 4-03 |
| **inverse Conway manoeuvre** | choosing the architecture first, then shaping the teams so their communication structure produces it | 5 · 1-06 |
| **inverted index** | a map from a value to the rows containing it, so a search reads a few short lists instead of every row | 5 · 11-09 |
| **isolation** | what a transaction may see of others running at the same time | 3 · 1-04 |
| **item collection** | the rows sharing one partition key. The unit that must fit on one node | 2 · 8-04 |
| **jitter** | randomness added to a backoff delay, so retrying clients do not synchronise | 1 · 9-05 |
| **jumbo chunk** | a MongoDB chunk whose keys all share one shard-key value, so it has no split point and grows on one shard | 2 · 8-08 |
| **Kafka transaction** | writes to several partitions, plus the consumer's offset commit, made one atomic unit | 4 · 5-04 |
| **Kappa architecture** | one log replayed at batch speed for a full recompute and at stream speed for live updates, so there is one implementation to keep correct | 4 · 13-02 |
| **keep-alive** | reusing an open connection for the next request, saving the handshake | 1 · 6-05 |
