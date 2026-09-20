## SSTables and Bloom filters

- The flushed file is an **SSTable** (sorted string table): sorted, immutable, with a sparse index in memory, one entry per block, so a lookup seeks once and scans one block
- The **Bloom filter** is a small bit array per file that answers "is this key in this file?" with two answers: definitely not, or probably yes

<svg viewBox="0 0 460 140" role="img" aria-label="A Bloom filter. The read checks the Bloom filter first. If it says 'no', the SSTable is skipped entirely. If it says 'yes', the read proceeds to disk." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="60" y="66" text-anchor="middle">Read: "Bob"</text>
  
  <rect x="140" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="27" text-anchor="middle">Bloom Filter 1</text>
  <text x="190" y="42" text-anchor="middle" font-size="7">Definitely No</text>
  
  <rect x="140" y="70" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="87" text-anchor="middle">Bloom Filter 2</text>
  <text x="190" y="102" text-anchor="middle" font-size="7">Probably Yes</text>
  
  <path d="M100 62 L140 30" stroke="#1a1a1a" fill="none"/><path d="M140 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 140 30)"/>
  <path d="M100 62 L140 90" stroke="#1a1a1a" fill="none"/><path d="M140 90 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="300" y="70" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="87" text-anchor="middle">SSTable 2</text>
  <text x="350" y="102" text-anchor="middle" font-size="7">Disk seek</text>
  
  <path d="M240 90 L300 90" stroke="#1d4e89" fill="none"/><path d="M300 90 l-3 -3 v6 z" fill="#1d4e89"/>
  
  <text x="270" y="27" text-anchor="middle" fill="#6b6b6b">File 1 skipped</text>
</svg>

- "Definitely not" skips the file without a disk read. "Probably" costs a read that may find nothing; Cassandra's default false-positive chance per table is 0.00075

### The failure

- A read for a key that does not exist, with no filter. Nothing can stop early, so the read visits every file at every level before it can say "not found". Missing keys are the expensive reads in an LSM engine
