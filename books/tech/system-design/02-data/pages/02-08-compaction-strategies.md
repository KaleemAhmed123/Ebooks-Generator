## Compaction strategies

- Every flush adds a file. **Compaction** merges files in the background, keeps the newest value per key, drops the rest, and writes the result as fewer, larger files
- The strategy decides which files merge and when:

| Strategy | How it works | Buys | Costs |
|---|---|---|---|
| **Size-tiered** (STCS, Cassandra default) | Merge files of similar size into one bigger file | Cheapest on writes | Space: inputs and output exist together during the merge; a key can live in many files |
| **Leveled** (LCS; RocksDB's default style) | Levels L1, L2, L3…, each 10× the last (RocksDB multiplier); no overlapping files inside a level | Reads and space: one file per level per key | Write amplification: a value is rewritten each time it moves down a level |
| **Time-window** (TWCS) | Files grouped by the window they were written in | Expiring a window drops whole files | Only for immutable time-series |
| **Unified** (UCS) | Cassandra's newest strategy, tunable between tiered and leveled | "Recommended for new workloads" | New; fewer years of operational lore |

### The failure

- Compaction debt. Writes outrun the merge, level 0 fills with overlapping files, and every read pays for all of them. RocksDB then throttles writes, and past a second threshold stops them, when L0 files, memtables or pending compaction bytes pile up. The stall applies to the whole database, not one key
