## SSTables and Bloom filters

- The file flushed to disk is a Sorted String Table (SSTable). Because the keys are perfectly sorted, the database does not need an index for every key. It keeps a sparse index in memory (e.g., one key for every 4 kB block) to tell it where to seek
- The real defense against read amplification is the **Bloom filter**. A Bloom filter is a probabilistic data structure in memory that answers one question: "Is this key in this file?"

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

- If the filter says "definitely not here", the database skips the file entirely. If it says "probably here", the database reads the file. Cassandra sets the false positive chance to 0.00075 by default

### The failure

- Searching for a key that does not exist in a database with no Bloom filters. The database will check every single SSTable on disk, from the newest to the oldest, attempting to find it. This destroys read latency
