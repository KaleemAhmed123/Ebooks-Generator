## One read, end to end

- One `SELECT` by key, followed the same way. The write's risk was loss; the read's is reading the past

<svg viewBox="0 0 460 200" role="img" aria-label="End to end read path. Client to Router, Router queries Zookeeper for map, Router sends request to Replica, Replica checks Bloom Filter, checks Index/Memtable, fetches from Heap/SSTable, returns to Client." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="80" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="35" y="99" text-anchor="middle">Client</text>
  
  <rect x="90" y="80" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="99" text-anchor="middle">Router</text>
  
  <rect x="90" y="20" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="120" y="34" text-anchor="middle" font-size="7">Map Cache</text>
  
  <rect x="190" y="10" width="120" height="180" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="250" y="25" text-anchor="middle" font-weight="bold">Data Replica</text>
  <text x="250" y="35" text-anchor="middle" font-size="7" fill="#b8541a">Lag: 50ms</text>
  
  <rect x="210" y="50" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="69" text-anchor="middle">Bloom Filter</text>
  
  <rect x="210" y="100" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="119" text-anchor="middle">Index / Memtable</text>
  
  <rect x="210" y="150" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="250" y="169" text-anchor="middle">Heap / SSTable</text>
  
  <path d="M60 90 L90 90" stroke="#1a1a1a" fill="none"/><path d="M90 90 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="75" y="85" text-anchor="middle" font-size="6">1. Query</text>
  
  <path d="M120 40 L120 80" stroke="#6b6b6b" fill="none" stroke-dasharray="2 2"/>
  <text x="145" y="60" text-anchor="middle" font-size="6" fill="#6b6b6b">2. Route</text>
  
  <path d="M150 90 L200 65" stroke="#1a1a1a" fill="none"/><path d="M200 65 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-25 200 65)"/>
  <text x="175" y="70" text-anchor="middle" font-size="6">3. Send</text>
  
  <path d="M250 80 L250 100" stroke="#1a1a1a" fill="none"/><path d="M250 100 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="260" y="93" font-size="6">4. Search</text>
  
  <path d="M250 130 L250 150" stroke="#1a1a1a" fill="none"/><path d="M250 150 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="260" y="143" font-size="6">5. Fetch page</text>
  
  <path d="M210 160 L140 110" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/><path d="M140 110 l6 -1 v6 z" fill="#1d4e89" transform="rotate(35 140 110)"/>
  <text x="180" y="145" font-size="6" fill="#1d4e89">6. Result</text>
</svg>

- Route: the cached partition map picks a partition, and may be stale after a move (Module 8, page 14). Replica: a follower, some lag behind the leader (Module 5, page 8), or R leaderless replicas voting (Module 7, page 2). Index: a secondary index, local or global, itself possibly behind the table (Module 8, pages 12 and 13). Storage: a B-tree descent, or memtable then Bloom filters then SSTables (Module 2). Result

### The failure

- Assuming the fastest path is the freshest. It is usually the opposite: the nearest replica is the one with lag, the global index is the one updated asynchronously, the cached map is the one that is wrong. Every stage that made the read fast made it older
- If the code cannot tolerate an old value, say which reads those are and pay for them: leader reads, `remote_apply`, quorum reads, or a session that tracks the write position (Module 5, page 9). Paying for all reads is how a cluster becomes one node again
