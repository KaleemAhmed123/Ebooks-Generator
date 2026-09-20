# Module 2 - Storage engines

## The simplest database

- A **storage engine** is the part of a database that lays bytes out on disk and finds them again
- The simplest one appends every write to the end of a file. Nothing is modified in place, so every write is sequential

<svg viewBox="0 0 460 140" role="img" aria-label="Append-only log with an in-memory hash index. The file stores sequential writes. The RAM stores a hash map from the key to the file offset." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="120" height="90" rx="3" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold" fill="#b8541a">RAM (Hash Index)</text>
  <text x="60" y="55">key</text>
  <text x="130" y="55">offset</text>
  <path d="M50 60 L170 60" stroke="#b8541a" fill="none"/>
  <text x="60" y="75">user:1</text>
  <text x="130" y="75">1024</text>
  <text x="60" y="95">user:2</text>
  <text x="130" y="95">1056</text>
  
  <rect x="250" y="20" width="150" height="90" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="325" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Disk (Append Log)</text>
  
  <path d="M250 50 L400 50" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/>
  <text x="260" y="65">1024</text>
  <text x="300" y="65">{"name": "Alice"}</text>
  
  <path d="M250 80 L400 80" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/>
  <text x="260" y="95">1056</text>
  <text x="300" y="95">{"name": "Bob"}</text>
  
  <path d="M150 72 L250 62" stroke="#1a1a1a" fill="none"/><path d="M250 62 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 250 62)"/>
  <path d="M150 92 L250 92" stroke="#1a1a1a" fill="none"/><path d="M250 92 l-6 -3 v6 z" fill="#1a1a1a"/>
</svg>

- Reads use an in-memory hash map, `key → (file, offset, size)`: look up the key, one seek, read the value
- This is Bitcask (Riak). Old values are superseded, not overwritten, so a background merge rewrites old files keeping only the live value per key, and writes a hint file so the map rebuilds fast on restart

### The failure

- Every key must fit in RAM. Bitcask's paper says it outright: the keydir "must fit entirely in RAM". Billions of keys means billions of map entries
- No range queries. `user:100` to `user:200` is a scan of the whole map, because a hash map has no order
