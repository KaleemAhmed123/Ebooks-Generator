## Covering Index

*INCLUDE*

An index carrying every column a query needs, so Postgres answers from the index
alone and never touches the table.

`CREATE INDEX ... ON orders (user_id) INCLUDE (total, status)` turns an index
scan plus a heap fetch into an **index-only scan** — commonly three to five
times faster on a hot read path.

The heap fetch is random I/O, and removing it is where the gain comes from.

**It depends on the visibility map being current**, which means it depends on
vacuum. An index-only scan on a heavily updated table quietly degrades into heap
fetches when autovacuum falls behind, and the plan still says "Index Only Scan"
while doing it.

## Dead Letter Queue

*DLQ*

A separate queue holding messages that failed repeatedly, were rejected, or
expired. Instead of vanishing, they wait somewhere you can look.

A payment notification fails three times and moves to the DLQ with the failure
reason in its headers. An engineer replays it the next morning, rather than
learning about it from a support ticket.

**Alert on DLQ depth above zero.** A dead letter queue nobody watches is a
folder where lost work accumulates quietly — which is the same outcome as having
no DLQ, with more infrastructure.
