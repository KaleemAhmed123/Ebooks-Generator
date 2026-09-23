## Glossary: C

| Term | Means | Where |
|---|---|---|
| **causation id** | the id of the message that caused this one | 4 · 10-04 |
| **CDN** | a shared cache at the network edge, keyed by URL, serving from the nearest point of presence and reaching the origin only on a miss | 5 · 9-01 |
| **change data capture (CDC)** | reading a database's own write-ahead log instead of polling a table, so every committed change arrives in commit order | 4 · 8-04 |
| **chaos engineering** | causing a failure on purpose, in a controlled scope, to test whether the system does what the design claims | 5 · 4-11 |
| **checkpoint** | a stream processor's saved state, so a restart resumes instead of recomputing from zero | 4 · 12-01 |
| **check-then-act** | the race where two callers both look, both find nothing, and both proceed | 1 · 10-05 |
| **choreography** | each service reacts to the previous one's event and emits its own. The state is the event trail | 3 · 4-08 |
| **circuit breaker** | a wrapper that counts failures and, past a threshold, fails calls immediately without touching the network | 5 · 4-03 |
| **closed-loop** | a load generator that waits for each reply before sending the next, so it stalls whenever the system does | 1 · 1-07 |
| **CloudEvents** | the standard wrapper an event carries regardless of payload: `id`, `source`, `specversion`, `type` | 4 · 11-01 |
| **clustering columns** | the columns setting the sort order of rows inside one partition | 2 · 1-04 |
| **columnar storage** | storing column chunks inside row groups, so an aggregate reads only the columns it names | 2 · 9-03 |
| **commutative update** | a write expressed as a delta (`stock - 3`) rather than an absolute (`stock = 7`), so concurrent applications do not lose each other | 3 · 4-07 |
