## Durability ends at fsync

- **Durability**: once `COMMIT` returns, the write survives a crash or power loss. The mechanism is the **write-ahead log (WAL)**, an append-only file the database writes and flushes before it acknowledges
- **`fsync`** is the system call that makes the operating system push its buffered writes to the disk. Until it returns, "written" means "in memory"

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

- That is where the promise stops: one machine's disk. With asynchronous replication the leader acknowledges after its own fsync and ships the change to followers later. Lose the leader in that window and the committed write is gone, and the client that got the acknowledgement does not know
- Booklet 02's replication module has the knob: Postgres `synchronous_commit` chooses whether "committed" waits for a standby, and what each setting costs

### The failure

- Treating "committed" as "on every replica". Durability is a per-machine promise unless replication is synchronous. The design has to say which writes are worth the extra round-trip; most designs have not said
