# Module 4 - Latency numbers every engineer should know

## The original table, and what moved

- Jeff Dean published these numbers in a 2010 Stanford talk. They became the reference every system-design interview cites
- Below are the key rows — the orders-of-magnitude ladder. The full 2010 table had 12 lines; the ones dropped here (L2, mutex, compress, etc.) sit between the ones shown

| Operation | 2010 | 2026 | What changed |
|---|---|---|---|
| L1 cache reference | 0.5 ns | ~1 ns | minor |
| Main memory reference | 100 ns | ~100 ns | flat since ~2000 |
| SSD random read | *not listed* | ~100 µs | SSDs were not on the 2010 list |
| Datacenter RTT | 500 µs | ~100–250 µs | better fabric, same order |
| Disk seek (HDD) | 10 ms | ~10 ms | spinning disks have not changed |
| CA → Netherlands → CA | 150 ms | ~150 ms | speed of light did not change |

- Three things did not move: **memory latency** (physics of DRAM), **speed of light** (physics), and **HDD seek** (spinning platter)
- What moved: **storage** (SSDs replaced most disk), **network bandwidth** (100 Gbps NICs), and the SSD row that was not on the original list

### The failure

- Quoting a 2010 disk-seek number for a design that runs entirely on NVMe. The 10 ms figure is for a spinning platter. An SSD random read is ~100 µs — a hundred times faster

