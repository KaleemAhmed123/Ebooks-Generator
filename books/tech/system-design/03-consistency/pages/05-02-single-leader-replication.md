## Single-leader replication

- The most common way to build a replicated database is **Single-Leader Replication** (sometimes historically called Master-Slave replication). It is the default for Postgres, MySQL, and most cloud databases like Amazon RDS
- In this architecture, exactly one node is designated as the **Leader**. Every other node is a **Follower**

<svg viewBox="0 0 460 140" role="img" aria-label="Single-leader replication. The app sends writes to the leader. The leader commits and streams the WAL to the followers. The app sends reads to the followers." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="74" text-anchor="middle" font-weight="bold">Application</text>
  
  <circle cx="230" cy="40" r="25" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="44" text-anchor="middle" font-weight="bold">Leader</text>
  
  <circle cx="380" cy="40" r="25" fill="#fff" stroke="#1d4e89"/>
  <text x="380" y="44" text-anchor="middle">Follower 1</text>
  
  <circle cx="380" cy="100" r="25" fill="#fff" stroke="#1d4e89"/>
  <text x="380" y="104" text-anchor="middle">Follower 2</text>
  
  <path d="M100 50 L200 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M200 40 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-5 200 40)"/>
  <text x="150" y="40" text-anchor="middle" font-weight="bold" font-size="6">Writes</text>
  
  <path d="M255 40 L350 40" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M350 40 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="300" y="35" text-anchor="middle" font-size="6">WAL Stream</text>
  
  <path d="M250 55 L355 95" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M355 95 l-6 -2 v5 z" fill="#1a1a1a" transform="rotate(20 355 95)"/>
  
  <path d="M100 80 L350 100" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M350 100 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(5 350 100)"/>
  <text x="225" y="95" text-anchor="middle" font-weight="bold" font-size="6">Reads</text>
</svg>

- **How it works**:
  1. The application sends all `INSERT`, `UPDATE`, and `DELETE` queries to the Leader
  2. The Leader executes the query, writes the changes to its Write-Ahead Log (WAL), and commits the transaction
  3. The Followers continuously stream the WAL from the Leader over the network and apply the exact same byte-for-byte changes to their own disks
  4. The application sends `SELECT` queries to the Followers to reduce load on the Leader

### The failure

- Writing to a read replica. Followers are strictly read-only. If you configure your application framework with the wrong connection string, and it tries to run an `UPDATE` against a Follower, the database will instantly throw an error. Only the Leader is allowed to accept writes, because allowing writes anywhere else would cause the databases to diverge permanently
