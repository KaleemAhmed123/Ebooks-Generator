## Durability ends at fsync

- **Durability** guarantees that once a transaction commits, the data will not be lost, even if the database power cable is immediately unplugged
- A transaction is durable only when the database issues an `fsync` command, forcing the operating system to flush the Write-Ahead Log (WAL) from memory down to the physical disk platter or SSD cells

<svg viewBox="0 0 460 140" role="img" aria-label="Durability ends at fsync. Client writes to Leader, Leader fsyncs to disk, then replies 'Committed'. The Follower has not yet received the write." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle">Client</text>
  
  <rect x="150" y="20" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="40" text-anchor="middle" font-weight="bold">Leader Node</text>
  <text x="200" y="50" text-anchor="middle" font-size="6">RAM (Volatile)</text>
  
  <rect x="150" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="200" y="100" text-anchor="middle" font-weight="bold">Local SSD</text>
  <text x="200" y="110" text-anchor="middle" font-size="6">fsync() = Durable</text>
  
  <rect x="330" y="20" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="40" text-anchor="middle" font-weight="bold">Follower Node</text>
  <text x="380" y="50" text-anchor="middle" font-size="6">Lag: 500ms</text>
  
  <path d="M80 65 L150 45" stroke="#1a1a1a" fill="none"/><path d="M150 45 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 150 45)"/>
  <text x="110" y="45" font-size="6">1. Write</text>
  
  <path d="M200 60 L200 80" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M200 80 l-3 -6 h6 z" fill="#1d4e89"/>
  <text x="205" y="72" font-size="6" fill="#1d4e89" font-weight="bold">2. fsync()</text>
  
  <path d="M150 50 L80 75" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M80 75 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 80 75)"/>
  <text x="115" y="75" font-size="6">3. "Committed!"</text>
  
  <path d="M250 40 L330 40" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/><path d="M330 40 l-6 -3 v6 z" fill="#b8541a"/>
  <text x="290" y="35" text-anchor="middle" font-size="6" fill="#b8541a">4. Async stream</text>
</svg>

- **The limit**: Durability defines what happens on a single machine. It does not dictate what happens across the network
- As we covered in Booklet 02, if you are using Single-leader Asynchronous replication, the database will `fsync` the write to the Leader's disk and reply "Committed" to the client *before* the Follower receives it. If the Leader's motherboard catches fire a millisecond later, that "durable" write is permanently lost

### The failure

- Reading "Committed" to mean "on every replica". A transaction guarantee ends exactly where your hardware configuration tells it to end. If you want a transaction to survive the physical destruction of the primary datacenter, you must pay the latency cost of Synchronous replication
