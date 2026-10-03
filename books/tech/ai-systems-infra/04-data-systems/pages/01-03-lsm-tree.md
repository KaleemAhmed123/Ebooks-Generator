## LSM-trees

- An **LSM-tree** refuses to update in place. Every write goes two places at once: an in-memory sorted structure called the **memtable**, and an append to the **WAL** on disk (for durability). When the memtable fills, it's **flushed** to disk as an immutable sorted file — an **SSTable** — and a fresh memtable starts. Writes are therefore **sequential appends**, never random seeks, which is why LSM engines sustain enormous write throughput.

<svg viewBox="0 0 360 96" role="img" aria-label="LSM write path: writes hit the in-memory memtable and the WAL; a full memtable flushes to an immutable SSTable; background compaction merges SSTables and drops overwritten and deleted keys" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="12" width="70" height="20" rx="3" fill="#ece4f3" stroke="#6a4c93"/><text x="45" y="24" text-anchor="middle" font-size="6">write</text>
  <rect x="100" y="8" width="84" height="16" rx="3" fill="#f1ecf6" stroke="#6a4c93"/><text x="142" y="19" text-anchor="middle" font-size="6">memtable (RAM)</text>
  <rect x="100" y="28" width="84" height="14" rx="3" fill="#fdf2e9" stroke="#b5651d"/><text x="142" y="38" text-anchor="middle" font-size="5.6">WAL (durability)</text>
  <rect x="210" y="6" width="60" height="14" rx="2" fill="#f7f4fa" stroke="#6a4c93"/><text x="240" y="16" text-anchor="middle" font-size="5.6">SSTable</text>
  <rect x="210" y="24" width="60" height="14" rx="2" fill="#f7f4fa" stroke="#6a4c93"/><text x="240" y="34" text-anchor="middle" font-size="5.6">SSTable</text>
  <rect x="296" y="14" width="58" height="16" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="325" y="25" text-anchor="middle" font-size="5.6">compacted</text>
  <path d="M80 22 L100 18" stroke="#1a1a1a" marker-end="url(#ls)"/><path d="M80 24 L100 33" stroke="#999" marker-end="url(#ls)"/>
  <path d="M184 16 L210 13" stroke="#1a1a1a" marker-end="url(#ls)"/><text x="196" y="52" font-size="5.2" fill="#777">flush when full</text>
  <path d="M270 20 L296 22" stroke="#2f7d4f" marker-end="url(#ls)"/><text x="283" y="46" text-anchor="middle" font-size="5.2" fill="#2f7d4f">compaction</text>
  <defs><marker id="ls" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Because SSTables are immutable, an "update" is just a **new** entry with the same key in a newer SSTable, and a "delete" is a **tombstone** marker. **Compaction** runs in the background, merging SSTables, keeping only the newest value per key and dropping tombstoned ones — this is what reclaims space and stops reads from scanning endless files.
- **The read cost.** A key could be in the memtable, or any SSTable, so a read may check **several** places, newest first. Two tricks keep reads fast: each SSTable is sorted (binary search within it), and a **Bloom filter** per SSTable answers "is this key *definitely not* here?" in one cheap check, so reads skip SSTables that can't contain the key. Still, a read touching multiple files is the LSM's inherent weakness — the mirror image of the B-tree's write weakness. Cassandra, RocksDB, and ScyllaDB accept it to get the write throughput.
