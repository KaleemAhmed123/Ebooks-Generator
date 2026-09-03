## Materialized View

A stored, precomputed query result. Fast to read, stale until refreshed — and
`REFRESH` takes an exclusive lock unless you say `CONCURRENTLY`.

A dashboard aggregate takes 14 seconds live. Materialised and refreshed every
five minutes it reads in 20 milliseconds, and is at most five minutes behind.

The staleness window is the real design decision, and it belongs to the product:
five minutes is invisible on a revenue dashboard and unacceptable on a stock
count.

**`REFRESH CONCURRENTLY` requires a unique index on the view.** Without one the
refresh blocks every reader for its whole duration, which on a large view is the
outage you built the view to avoid.

## Message Ordering

Order holds within a single queue read by a single consumer. Add concurrency and
ordering is gone.

Two consumers on one queue process `user.created` and `user.updated` in
parallel. The update lands first and fails against a user that does not exist
yet.

| Setup | Ordered |
|---|---|
| one queue, one consumer | yes |
| one queue, several consumers | no |
| consistent-hash by entity id | yes, per entity |

The third row is the practical answer: partition by the key that must stay
ordered, so one entity's events go to one consumer while different entities
still run in parallel.
