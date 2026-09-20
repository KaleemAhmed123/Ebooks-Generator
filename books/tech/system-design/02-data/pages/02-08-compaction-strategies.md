## Compaction strategies

- Because the memtable keeps flushing new files, the disk will eventually fill up with thousands of overlapping SSTables. To fix this, a background thread periodically reads old files, merges them, and writes a new, cleaner file (compaction)
- You must choose how this merge happens:

| Strategy | How it works | Buys | Costs |
|---|---|---|---|
| **Size-Tiered (STCS)** | Merge files of similar sizes (e.g. 4 small files become 1 medium file). | Write speed (fewest merges). | Space. A merge needs 2× the disk space of the files being merged. |
| **Leveled (LCS)** | Keep files small. Move them down levels (L1, L2, L3). Each level is 10× larger than the last (RocksDB). | Read speed (guaranteed 1 file per level). | Write amplification (one write is merged many times as it moves down). |
| **Time-Window (TWCS)** | Group files by the hour or day they were written. | Dropping whole buckets of old time-series data. | Read speed for non-time queries. |

### The failure

- Compaction debt. If your application writes faster than the background thread can merge, the small files pile up. RocksDB will intentionally stall (slow down) and eventually stop your writes entirely if L0 files or pending compaction bytes pile up. The database must protect itself from drowning
