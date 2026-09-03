## TTL & Eviction Policy

TTL expires keys by time. The eviction policy decides what to drop when memory
fills. `noeviction` means writes start failing.

A cache configured `noeviction` fills up and every `SET` returns an
out-of-memory error — an outage caused by a cache, which is the wrong direction
for a cache to fail.

| Policy | Behaviour at the limit |
|---|---|
| `noeviction` | writes error — an outage |
| `allkeys-lru` | drop least recently used |
| `allkeys-lfu` | drop least frequently used |
| `volatile-ttl` | drop whatever expires soonest |

If Redis is a cache, it should be allowed to forget. `noeviction` is only
correct when it is being used as a store, and then the memory limit is a
capacity problem rather than a policy one.

## VACUUM / Autovacuum

The background process that reclaims dead row versions and refreshes planner
statistics. Ignore it and tables bloat while query plans quietly go wrong.

A high-churn table grows four times larger on disk than its live data, and
sequential scans slow to a crawl — autovacuum could not keep pace with the
update rate.

Bloat is the visible half. **Stale statistics are the half that produces a
forty-second query with a plan that looks reasonable** — the planner choosing
correctly from wrong numbers. Left long enough it ends at transaction ID
wraparound, which is a forced shutdown.
