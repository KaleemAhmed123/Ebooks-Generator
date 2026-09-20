## QPS, storage, bandwidth

- Every system-design estimation lands on three quantities. Each has its own bottleneck

| Quantity | How to estimate | What it sizes |
|---|---|---|
| **QPS** | DAU × actions/user ÷ 86,400. Peak = 2–3× average | instances, thread pools, connection limits |
| **Storage** | writes/day × row size × retention period | disks, partitioning strategy |
| **Bandwidth** | QPS × average payload size | NICs, CDN, egress budget |

### Worked example

- 500M events/day × 1 KB each = 500 GB/day
- Per year: 500 GB × 365 ≈ 180 TB/year. That is raw data
- ×3 replicas: 540 TB. ×2 for indexes and overhead: ~1 PB/year

### The failure

- Computing QPS and stopping. The interviewer asks "how much storage over five years?" and the candidate has no number. Five years at 180 TB/year (before replication) is 900 TB. With replication and indexes, it crosses a petabyte
- Storage is the one that creeps. QPS is bounded by users; storage is bounded by time × writes × retention. Always compute it
