## REST vs GraphQL vs gRPC

Three shapes for an API, each optimal in a different place, and none of them a
default.

| | Strength | Cost |
|---|---|---|
| REST | simple, cacheable at every layer | over-fetching and under-fetching |
| GraphQL | client asks for exactly what it needs | caching and rate limiting get hard, N+1 by default |
| gRPC | binary, typed, streaming, fast | needs a proxy to reach a browser |

A mobile client pulling forty fields to render six is the GraphQL case.
High-volume internal service-to-service traffic is the gRPC case. A public API
that strangers will integrate against is almost always REST, because the cost of
being boring is lower than the cost of being clever in a contract you cannot
change.

## RPO vs RTO

Recovery point objective is how much data you can afford to lose. Recovery time
objective is how long you can afford to be down. They are different numbers and
they buy different things.

| RPO | RTO | What that actually requires |
|---|---|---|
| 24 h | 8 h | nightly backup, manual restore |
| 5 min | 8 h | continuous WAL shipping, manual promotion |
| 5 min | 5 min | hot standby, automated failover |
| 0 | 0 | active-active, and the conflict problem that comes with it |

Stating one without the other produces the wrong architecture. An RPO of five
minutes with nightly backups is not a strategy, and a hot standby does nothing
about data loss if replication is asynchronous.
