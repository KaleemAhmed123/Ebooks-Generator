## CPU and memory

- Everything here is nanoseconds. A nanosecond is a billionth of a second — light travels about 30 cm

| Operation | Time | Source |
|---|---|---|
| L1 cache reference | ~1 ns | Dean 2010 |
| Non-crypto hash of 64 B | ~10 ns | napkin-math, 2026-03 |
| Main memory reference (dependent load) | ~100 ns | Dean 2010, flat since ~2000 |
| Crypto hash (SHA-256) | ~100 ns | napkin-math, 2026-03 |
| System call | ~300 ns | napkin-math, 2026-03 |
| Context switch | ~10 µs | napkin-math, 2026-03 |
| Sequential memory read, single thread | ~20 GiB/s | napkin-math, 2026-03 |

- **100 ns for a dependent load** is the number that matters most. A "dependent load" means the address of the next read depends on the result of the previous one — a pointer chase through a linked list, a tree, or a hash map's chain
- Sequential access is fast: 20 GiB/s. Random access is slow: each hop waits 100 ns for DRAM. The layout of data in memory decides which speed you get

### The failure

- An "in-memory" service that is memory-latency bound because every lookup is a chain of pointers. The data is in RAM but the access pattern makes each step wait 100 ns. Thousands of pointer hops per request, each waiting for DRAM
