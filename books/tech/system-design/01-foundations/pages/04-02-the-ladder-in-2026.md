## The ladder in 2026

- One table, three rungs: memory, SSD, the datacenter network. Each rung is roughly a thousand times the one above; the blob store, on page 4, is a thousand above that

| Operation | Time | Source |
|---|---|---|
| L1 cache reference | ~1 ns | Colin Scott's model; Dean 2010 said 0.5 ns |
| Main memory, one dependent load | ~100 ns | Dean 2010, flat since ~2000 |
| System call | ~300 ns | napkin-math, 2026-03 |
| Context switch | ~10 µs | napkin-math, 2026-03 |
| TCP echo server, 32 KiB | ~50 µs | napkin-math, 2026-03 |
| SSD random read (8 KiB) | ~100 µs | napkin-math, 2026-03 |
| Network RTT, same region | ~250 µs | napkin-math, 2026-03 |
| SSD write **with fsync** | ~300 µs | napkin-math, 2026-03 |
| Redis / Memcached / MySQL query | ~500 µs | napkin-math, 2026-03 |
| HDD seek | ~10 ms | Dean 2010, unchanged |

- A **dependent load** is a read whose address comes from the previous read: a pointer chase through a list, a tree, a hash chain. Sequential memory streams at ~20 GiB/s; each dependent hop waits the full 100 ns. The layout of data decides which speed you get

### Two lessons the table hides

- **The network is not slower than disk any more.** A same-region round trip at 250 µs and an SSD random read at 100 µs are the same order. A Redis call at 500 µs is the same order as local storage. "Cache to local disk to avoid the network" is a 2010 instinct
- **fsync is the price of durability.** `fsync` forces data from the OS buffer to the drive; until it returns, a crash can lose the write. 2 µs without, 300 µs with: 150×. A benchmark quoting 500,000 writes/s without fsync describes a database that forgets

### The failure

- A service that reads a local SQLite file on every request "to stay off the network". It saved ~400 µs per read and bought a stateful pod that cannot be load-balanced, replicated, or restarted without losing data
