## The LSM tree

- To solve the random-write problem of the B-tree, databases like Cassandra and RocksDB use a Log-Structured Merge (LSM) tree. It optimizes entirely for writes
- Instead of updating pages on disk, all writes go straight into memory (into a sorted structure called the `memtable`). When the memtable fills up (e.g., 64 MB in RocksDB), it flushes to disk as an immutable file

<svg viewBox="0 0 460 140" role="img" aria-label="LSM tree. Writes go to RAM memtable. Memtable flushes to immutable SSTables on disk. Reads check memtable, then L0 SSTables, then L1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="60" y="36" text-anchor="middle">Write</text>
  
  <rect x="130" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="27" text-anchor="middle">Memtable (RAM)</text>
  <text x="180" y="42" text-anchor="middle" font-size="7">Sorted tree</text>
  
  <rect x="280" y="10" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="27" text-anchor="middle">SSTable (Disk)</text>
  <text x="330" y="42" text-anchor="middle" font-size="7">Immutable file</text>
  
  <path d="M100 32 L130 32" stroke="#1a1a1a" fill="none"/><path d="M130 32 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M230 32 L280 32" stroke="#1d4e89" fill="none"/><path d="M280 32 l-3 -3 v6 z" fill="#1d4e89"/>
  <text x="255" y="28" text-anchor="middle" font-size="7">Flush</text>
  
  <rect x="280" y="60" width="100" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="76" text-anchor="middle">Older SSTable</text>
  
  <rect x="280" y="95" width="100" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="111" text-anchor="middle">Oldest SSTable</text>
  
  <path d="M60 100 L170 50" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M170 50 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 170 50)"/>
  <path d="M60 100 L280 32" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M280 32 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M60 100 L280 72" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M280 72 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="20" y="88" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="60" y="104" text-anchor="middle">Read</text>
</svg>

- **Strengths**: Because the database never modifies an existing file, all disk writes are sequential. Sequential I/O is the fastest thing a disk can do. You get extreme write throughput
- **Use for**: Metrics, logging, time-series, messaging, and workloads where writes heavily outnumber reads

### The failure

- Read amplification. To answer a read query, the database checks the memtable. If the key is not there, it must check the newest file on disk, then the next newest, cascading downward. A single logical read triggers many physical disk reads
