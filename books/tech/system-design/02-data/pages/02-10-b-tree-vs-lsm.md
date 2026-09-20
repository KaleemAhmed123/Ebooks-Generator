## B-tree vs LSM: The three amplifications

- **Amplification** is the ratio of physical work to logical work. There are three, and an engine gets two of them cheap

| Amplification | B-tree (Postgres, MySQL) | LSM (Cassandra, RocksDB) |
|---|---|---|
| **Write** (bytes written per byte changed) | Expensive: a whole page rewritten to change a few bytes, plus the WAL | Cheap on the way in; paid later, as compaction rewrites each value per level |
| **Read** (files or pages touched per lookup) | Cheap: one root-to-leaf path | Expensive: memtable, then one file per level, Bloom filters permitting |
| **Space** (bytes on disk per live byte) | Medium: half-empty pages after splits | Expensive between compactions: old versions and tombstones wait to be merged out |

### The failure

- Choosing by fashion. An LSM engine for a workload that is nearly all point reads pays read amplification every request and collects the write benefit never. The read/write ratio from Module 1 decides, and it has to be measured, not guessed
