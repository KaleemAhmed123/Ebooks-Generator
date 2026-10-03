## Latency, bandwidth, and the speed of light

- Every design decision in this booklet is really about **where the data is** and **how far the message travels**, because the gaps between tiers are enormous and fixed. These orders of magnitude are the ones to burn into memory:

:::mint
```text
reference a byte of...            ...takes roughly        relative
L1 cache                          ~1 ns                   1×
main memory (RAM)                 ~100 ns                 100×
SSD read                          ~16 µs                  16,000×
same-datacenter network RTT       ~0.5 ms                 500,000×
cross-region RTT (e.g. US↔EU)     ~80–150 ms              ~100,000,000×
```
:::

- The lesson isn't the exact figures (they drift); it's the **ratios**. RAM is ~1000× slower than cache, the network ~1000× slower than RAM, and crossing a continent is ~100,000× slower than a local network hop. **A design that makes a cross-region call per item processed is dead on arrival** — a million items is a day of pure waiting, no matter how fast your code is.
- Two consequences that shape everything ahead:
  - **Locality wins.** Keep data near the compute that uses it (caches, replicas, co-location in one AZ — Booklet 2's cross-AZ fan-out). Moving the computation to the data beats moving the data to the computation.
  - **Batch and parallelise.** If you must cross a slow boundary, cross it **once** with many items (one query for 1,000 rows, not 1,000 queries), and do independent work **concurrently** so latencies overlap instead of summing.
- **The speed of light is the hard floor.** ~150 ms US↔Australia round trips aren't an engineering failure — light itself needs ~40 ms each way through fibre. No protocol beats physics; you beat it only by **not making the trip** (CDNs, replicas, regional deployments — Booklet 12).

:::note
This is why the rest of distributed systems exists. Replication (Module 3) puts data close to readers and survives node loss; partitioning (Module 4) spreads it so no single box is the bottleneck; caching keeps hot data in the fast tiers. All of it is a fight against these ratios.
:::
