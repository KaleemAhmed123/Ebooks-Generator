## Bulkhead

Separate resource pools per dependency, so one slow thing cannot drink the whole
allocation. Named after the compartments that stop a ship sinking from one hole.

One shared fifty-connection pool: the reporting database hangs, fifty threads
block on it, and login stops working. Split it — auth 20, reporting 10, search
20 — and reporting dies alone.

The sizing is the hard part. Pools sum to more than the database will accept, and
the bulkhead that was meant to contain a failure becomes the thing that causes
one.

## Burn Rate

How fast you are spending the error budget compared with spending it evenly. This
is the number that should page someone, not the raw error count.

| Burn rate | Monthly budget gone in | Response |
|---|---|---|
| 1× | 30 days | nothing, on track |
| 6× | 5 days | ticket |
| 14.4× | 2 hours | page now |

Alert on error counts instead and a low-traffic service pages on three errors
while a high-traffic one stays quiet through a genuine breach.

## Cache Stampede

The thundering herd aimed at a cache, together with the fix that belongs with it:
one caller recomputes, everyone else waits or takes the stale value.

The first miss takes a lock and refreshes. The other 7,999 concurrent misses
serve a value a few seconds old. One database query instead of 8,000.

Serving stale is the part teams resist, and it is the part doing the work. If
every caller must have a fresh value, you have chosen the 8,000 queries.
