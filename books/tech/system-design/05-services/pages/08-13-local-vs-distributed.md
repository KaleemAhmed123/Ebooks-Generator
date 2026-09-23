## In-process and distributed caches

- A `Map` in the process and a Redis cluster over the network are not competing options; they sit at different points on one trade-off between latency and agreement

| | In-process | Distributed |
|---|---|---|
| Read latency | nanoseconds, no syscall | a network round trip, sub-millisecond at best |
| Copies | one per instance | one, shared |
| Invalidation | reaches one process | reaches everyone at once |
| Memory cost | the working set × instance count | the working set, once |
| Survives a deploy | no — the heap goes with the process | yes |
| Right for | small, hot, tolerant of seconds of staleness | large, shared, or needing agreement |

- The in-process cache wins decisively on one shape: a small set of very hot keys where a second of staleness is acceptable. Feature flags, configuration, the top hundred products, a hot key absorbed in front of a shard (page 9). Under those conditions it removes the network entirely
- It loses just as decisively on size. Two gigabytes cached in each of forty instances is eighty gigabytes of RAM holding forty copies of the same thing, and each copy warms separately after every deploy

### The failure

- Reaching for the local cache and then inheriting the staleness it implies. Invalidation cannot reach another process's heap, so the only bound on how wrong an instance can be is its own TTL — and with a long TTL, forty instances hold forty different versions of the same value at the same moment
- Which instance the balancer picks then decides what the user sees, so a refresh flips between old and new. That is the shape of the bug: not stale, but *inconsistently* stale, and irreproducible for whoever gets the ticket. Local caches need TTLs short enough that the disagreement window is too small to notice — seconds, not minutes
