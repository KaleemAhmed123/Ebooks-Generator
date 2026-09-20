## The datacenter network

- Inside a datacenter, the network is **faster than disk** and faster than most people assume

| Operation | Time / throughput | Source |
|---|---|---|
| TCP echo, same zone (32 KiB) | ~50 µs | napkin-math, 2026-03 |
| Proxy hop | ~50 µs | napkin-math, 2026-03 |
| Same-zone RTT | ~100–250 µs | napkin-math, 2026-03 |
| Same-zone throughput (in VPC) | ~10 GiB/s | napkin-math, 2026-03 |
| Same-zone throughput (outside VPC) | ~3 GiB/s | napkin-math, 2026-03 |
| Redis / MySQL / Memcached query | ~500 µs | napkin-math, 2026-03 |

- A same-zone network read at 100 µs is **faster than an SSD random read** at 100 µs. A Redis query at 500 µs is the same order as an SSD access. The instinct to "cache to local disk" is backwards in a modern datacenter
- AWS availability zones are "within 100 km of each other." At 100 km of fiber (~200,000 km/s), the one-way propagation delay is ≤0.5 ms, so an inter-AZ round trip is ≤1 ms

### The failure

- A service that reads from a local SQLite file on every request "to avoid the network." The SQLite random read is ~100 µs. A Redis query over the network is ~500 µs. The local file saved 400 µs per read and cost the team a stateful deployment that cannot be load-balanced, cannot be replicated, and loses data on pod restart
