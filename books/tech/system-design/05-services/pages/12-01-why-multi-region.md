# Module 12 - Geography and real-time

## Why multi-region

- Three separate reasons, and each buys something different for a different price. Naming which one applies is what keeps the design honest, because a system built for one of them does not deliver the others

| Reason | What it actually requires |
|---|---|
| Latency | serving reads near the user — replicas, or an edge cache (Module 9) |
| Surviving a region | a second region with the data already in it, and a rehearsed failover |
| Data residency | data that never leaves a jurisdiction, including backups and logs |

- Distance is physics, not engineering. Azure's own measurements put the median round trip between East US and West Europe at **83 ms**, and between East US and Japan East at **162 ms** — floors that no amount of tuning removes, measured by network probes at the 50th percentile over the 30 days to 30 July 2026
- Those numbers are why a cross-region synchronous write is a design decision rather than a detail. Two round trips to acknowledge a write across the Atlantic is most of a fifth of a second before the application has done anything

### The failure

- Multi-region "for availability" with one regional database. The application runs in three regions and every one of them writes to the primary, so the second region adds a transcontinental round trip to every request and does not survive the loss of the first
- The tell is easy to test and rarely tested: turn off the primary region and see what the others do. If they cannot serve writes, the deployment is not multi-region for availability — it is a single-region system with remote application servers, at three times the cost and worse latency. Availability lives with the data, so the hard part is always the state, never the stateless tier that gets replicated first because it is easy
