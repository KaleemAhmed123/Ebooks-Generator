## The write-ahead log

- A database crashes in the middle of a write. The file on disk is half-written and corrupted. The data is gone
- To prevent this, almost every database (Postgres, MySQL, Cassandra, RocksDB) uses a Write-Ahead Log (WAL)

<svg viewBox="0 0 460 140" role="img" aria-label="Write-Ahead Log process. 1. Client sends write. 2. Append to sequential WAL file on disk. 3. fsync. 4. Return success to client. 5. Update main data structure." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="66" text-anchor="middle">Client</text>
  
  <rect x="150" y="10" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="27" text-anchor="middle">WAL (Disk)</text>
  <text x="190" y="42" text-anchor="middle" font-size="7">Sequential append</text>
  
  <rect x="320" y="70" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="360" y="87" text-anchor="middle">B-tree (Disk)</text>
  <text x="360" y="102" text-anchor="middle" font-size="7">Random writes</text>
  
  <path d="M80 62 L150 40" stroke="#1a1a1a" fill="none"/><path d="M150 40 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-20 150 40)"/>
  <rect x="95" y="40" width="12" height="12" rx="6" fill="#fff" stroke="#1a1a1a"/><text x="101" y="49" text-anchor="middle" font-size="7">1</text>
  
  <path d="M230 30 L270 30" stroke="#1a1a1a" fill="none"/><path d="M270 30 l-3 -3 v6 z" fill="#1a1a1a"/>
  <rect x="245" y="24" width="12" height="12" rx="6" fill="#fff" stroke="#1a1a1a"/><text x="251" y="33" text-anchor="middle" font-size="7">2</text>
  <text x="300" y="34" text-anchor="middle" font-size="8">fsync()</text>
  
  <path d="M190 50 L190 70 L80 70" stroke="#1a1a1a" fill="none"/><path d="M80 70 l6 -3 v6 z" fill="#1a1a1a"/>
  <rect x="125" y="64" width="12" height="12" rx="6" fill="#fff" stroke="#1a1a1a"/><text x="131" y="73" text-anchor="middle" font-size="7">3</text>
  
  <path d="M230 45 L320 80" stroke="#1a1a1a" fill="none"/><path d="M320 80 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 320 80)"/>
  <rect x="260" y="55" width="12" height="12" rx="6" fill="#fff" stroke="#1a1a1a"/><text x="266" y="64" text-anchor="middle" font-size="7">4</text>
</svg>

- Before the database touches its actual B-tree or tables, it appends a note to the WAL file: "I am about to change User 10's name." It calls `fsync()` to ensure the disk platter physically wrote the bytes. Only then does it return "Success" to the client
- When the database restarts after a crash, it reads the WAL from the last known checkpoint and replays the notes to repair the broken data structure

### The failure

- Running a database with `fsync = off` to make writes faster. The database writes the WAL to the operating system's memory cache, but returns success before the disk spins
- Postgres documentation warns that disabling fsync "can result in unrecoverable data corruption in the event of a power failure or system crash"
