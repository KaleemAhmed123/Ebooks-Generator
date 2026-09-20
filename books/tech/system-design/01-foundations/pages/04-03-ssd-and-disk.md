## SSD and disk

- The gap between SSD and spinning disk is the gap between microseconds and milliseconds — three orders of magnitude

| Operation | Time | Source |
|---|---|---|
| SSD sequential read (8 KiB) | ~1 µs (8 GiB/s) | napkin-math, 2026-03 |
| SSD sequential write (no fsync) | ~2 µs | napkin-math, 2026-03 |
| SSD random read (8 KiB) | ~100 µs | napkin-math, 2026-03 |
| SSD sequential write (with fsync) | ~300 µs (30 MiB/s) | napkin-math, 2026-03 |
| HDD seek | ~10 ms | Dean 2010, unchanged |

- **fsync** is the system call that forces data from the OS buffer to the physical drive. Until fsync returns, the data could be lost in a crash
- The difference between "write" and "write with fsync" is ~2 µs versus ~300 µs — 150×. That 300 µs is the number that decides **durability**: how much data a crash can lose

### The failure

- Measuring write throughput without fsync and shipping a database that loses commits on power failure. The benchmark said 500,000 writes/s. The durable rate was 3,300/s. Every crash lost the last 300 µs of writes that were "acknowledged"
- When someone quotes an SSD write speed, ask: with or without fsync? That is the difference between fast and safe
