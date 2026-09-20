## Deletes are writes (tombstones)

- In an LSM tree, files are immutable. You cannot open a file and delete a row. Therefore, to delete data, you must write a new record called a **tombstone**
- If "Bob" is deleted, the memtable gets a tombstone for Bob. When read, the database sees the tombstone before the older file containing Bob's data, and returns "Not Found". During the next compaction, the merge sees the tombstone and drops both records

<svg viewBox="0 0 460 140" role="img" aria-label="Tombstones. SSTable 1 contains a tombstone for Bob. SSTable 2 contains Bob's data. A read hits SSTable 1, sees the tombstone, and returns null without checking SSTable 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="30" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="47" text-anchor="middle">SSTable 1 (New)</text>
  <rect x="60" y="55" width="80" height="10" fill="#1a1a1a"/>
  <text x="100" y="63" text-anchor="middle" fill="#fff" font-size="7">Bob: TOMBSTONE</text>
  
  <rect x="250" y="30" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="300" y="47" text-anchor="middle">SSTable 2 (Old)</text>
  <rect x="260" y="55" width="80" height="10" fill="#fff" stroke="#1a1a1a"/>
  <text x="300" y="63" text-anchor="middle" font-size="7">Bob: "active"</text>
  
  <rect x="150" y="90" width="100" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="200" y="106" text-anchor="middle">Compaction Merge</text>
  
  <path d="M100 70 L170 90" stroke="#1d4e89" fill="none"/><path d="M170 90 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-15 170 90)"/>
  <path d="M300 70 L230 90" stroke="#1d4e89" fill="none"/><path d="M230 90 l-3 -6 h6 z" fill="#1d4e89" transform="rotate(-60 230 90)"/>
  
  <text x="200" y="130" text-anchor="middle" font-size="7" fill="#6b6b6b">Both records are dropped</text>
</svg>

- In a distributed database, the tombstone must replicate to every node. If a node is down, it misses the tombstone. The database keeps the tombstone around (Cassandra `gc_grace_seconds` defaults to 10 days) to give the node time to wake up and see it

### The failure

- A node goes offline for 12 days. It missed the tombstone, and the rest of the cluster has now compacted and dropped it. When the node comes back, it still has the old row. When queried, it happily returns the "deleted" data to the cluster, resurrecting the row from the dead
