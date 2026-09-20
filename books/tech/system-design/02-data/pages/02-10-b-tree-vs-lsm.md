## B-tree vs LSM: The three amplifications

- There is no universally superior engine. You must choose based on the three hardware amplifications. You get to keep two cheap, and must pay for one

| Amplification | B-tree (Postgres, MySQL) | LSM (Cassandra, RocksDB) |
|---|---|---|
| **Write** (Disk writes per logical write) | **Expensive**. An 8 kB page is overwritten just to change 10 bytes. | **Cheap**. Bytes are sequentially appended and flushed. |
| **Read** (Disk reads per logical read) | **Cheap**. Exactly one path from the root to the leaf. | **Expensive**. Must check the memtable, and multiple SSTables. |
| **Space** (Disk bytes per logical byte) | **Medium**. Pages fragment (splits) and leave empty space. | **Expensive**. Old row versions and tombstones wait for compaction. |

### The failure

- Choosing by fashion instead of by the measured read/write ratio. If you use Cassandra for a workload that is 99% reads, you are paying the heavy read amplification of the LSM tree without benefiting from its extreme write throughput. You should have used a B-tree
