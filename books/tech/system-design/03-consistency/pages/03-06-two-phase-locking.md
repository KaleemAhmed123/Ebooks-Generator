## Two-phase locking (2PL)

- **Two-phase locking** is the classic way to get serializable: readers take shared locks, writers take exclusive locks, and a transaction acquires locks in a **growing phase** and releases them all only at the end, the **shrinking phase**. Readers block writers and writers block readers

<svg viewBox="0 0 460 140" role="img" aria-label="Two-Phase Locking (2PL). Phase 1 is the Expanding Phase where locks are acquired. Phase 2 is the Shrinking Phase where locks are released at COMMIT." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 120 L230 40 L410 120" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M230 40 L230 120" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  
  <text x="140" y="70" text-anchor="middle" font-weight="bold">1. Growing Phase</text>
  <text x="140" y="80" text-anchor="middle" font-size="6">Acquiring locks</text>
  
  <text x="320" y="70" text-anchor="middle" font-weight="bold">2. Shrinking Phase</text>
  <text x="320" y="80" text-anchor="middle" font-size="6">Releasing locks</text>
  
  <rect x="210" y="30" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="43" text-anchor="middle" font-weight="bold">COMMIT</text>
  
  <circle cx="90" cy="102" r="3" fill="#1d4e89"/><text x="100" y="104" font-size="6">Read A</text>
  <circle cx="150" cy="75" r="3" fill="#1d4e89"/><text x="160" y="77" font-size="6">Write B</text>
  <circle cx="190" cy="57" r="3" fill="#1d4e89"/><text x="200" y="59" font-size="6">Read C</text>
  
  <circle cx="340" cy="88" r="3" fill="#b8541a"/><text x="350" y="90" font-size="6" fill="#b8541a">Release all</text>
</svg>

- The rule is exactly what makes it serializable: nothing you read can change until you commit, so the outcome equals some serial order. It is also the whole cost: a long read holds every writer behind it
- InnoDB's Serializable is 2PL: every plain `SELECT` becomes `SELECT … FOR SHARE` when autocommit is off (page 8). Postgres left 2PL behind for serializability and uses the next page's method
- Two-phase **locking** is not two-phase **commit**. 2PL orders transactions inside one database; 2PC makes one atomic decision across several (Module 4)

### The failure

- Throughput collapse on a hot row. One five-minute report holding a shared lock on `accounts` stops every deposit for five minutes, and every deposit queued behind it holds its own locks while it waits. The queue is the anomaly 2PL trades for
