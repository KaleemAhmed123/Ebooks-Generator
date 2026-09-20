## The LSM tree

- The **LSM tree** (log-structured merge tree) never updates a page in place. Cassandra, RocksDB, and everything built on RocksDB use it
- A write goes to the commit log, then into the **memtable**, a sorted structure in memory. When the memtable is full (RocksDB `write_buffer_size`, 64 MB by default) it is flushed to disk as one immutable sorted file. Old files are merged in the background (page 8)

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

- Every disk write is a sequential append or a sequential flush. Nothing seeks to a random page to update it; that is the whole reason the engine is write-fast

:::interview
"Why is Cassandra fast at writes?" — A write is an append to the commit log plus an insert into an in-memory memtable. No page on disk is read or modified. The disk sees sequential writes only; the merging is deferred to compaction.
:::

### The failure

- Read amplification. A read checks the memtable, then the newest file, then the next, until it finds the key. One logical read can touch several files; page 7 is how the engine skips most of them
