# Module 8 - End to end

## One write, end to end

- We have looked at storage engines, replication, and partitioning as isolated concepts. Now let's put them together. What actually happens when a client sends an `INSERT` statement to a modern distributed database?

<svg viewBox="0 0 460 200" role="img" aria-label="End to end write path. Client to Router, Router to Leader, Leader writes WAL, flushes disk, updates Memtable/B-Tree, sends WAL to Follower, Follower acks, Leader acks Router, Router acks Client." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="80" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="35" y="99" text-anchor="middle">Client</text>
  
  <rect x="90" y="80" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="99" text-anchor="middle">Router</text>
  
  <rect x="190" y="10" width="120" height="170" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="250" y="25" text-anchor="middle" font-weight="bold">Leader Node</text>
  
  <rect x="210" y="40" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="59" text-anchor="middle">WAL (RAM)</text>
  
  <rect x="210" y="90" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="250" y="109" text-anchor="middle">Disk fsync</text>
  
  <rect x="210" y="140" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="159" text-anchor="middle">B-Tree / Memtable</text>
  
  <rect x="360" y="80" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="400" y="99" text-anchor="middle">Follower</text>
  
  <path d="M60 90 L90 90" stroke="#1a1a1a" fill="none"/><path d="M90 90 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="75" y="85" text-anchor="middle" font-size="6">1.</text>
  
  <path d="M150 90 L200 60" stroke="#1a1a1a" fill="none"/><path d="M200 60 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 200 60)"/>
  <text x="175" y="70" text-anchor="middle" font-size="6">2. hash(key)</text>
  
  <path d="M250 70 L250 90" stroke="#1a1a1a" fill="none"/><path d="M250 90 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="260" y="83" font-size="6">3. append</text>
  
  <path d="M250 120 L250 140" stroke="#1a1a1a" fill="none"/><path d="M250 140 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="260" y="133" font-size="6">4. update</text>
  
  <path d="M290 55 L380 80" stroke="#1a1a1a" fill="none"/><path d="M380 80 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 380 80)"/>
  <text x="330" y="62" font-size="6">5. stream</text>
  
  <path d="M380 100 L290 105" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/><path d="M290 105 l6 -1 v6 z" fill="#1d4e89" transform="rotate(-5 290 105)"/>
  <text x="330" y="115" font-size="6" fill="#1d4e89">6. ack (sync)</text>
  
  <path d="M210 110 L150 100" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/><path d="M150 100 l6 -3 v6 z" fill="#1d4e89" transform="rotate(-10 150 100)"/>
  <text x="170" y="115" font-size="6" fill="#1d4e89">7. success</text>
</svg>

- **The path**: The router hashes the key to find the Leader node. The Leader appends the change to the WAL in memory. It then issues an `fsync` to flush the WAL to physical disk. Only after the disk confirms the write does the Leader update its B-tree (or Memtable)
- Simultaneously, the WAL stream is sent over the network to the Follower. If `synchronous_commit` is on, the Leader pauses and waits for the Follower to acknowledge receipt. Only then does the Leader reply "Success" to the router

### The failure

- Treating an "OK" response from the database as a guarantee of durability everywhere. Every step in this pipeline is a place to lose data
- If `fsync` is off, power loss destroys the write before it hits the Leader's disk. If replication is asynchronous, a datacenter failure destroys the write before it hits the Follower. "Success" only means what your configuration tells it to mean
