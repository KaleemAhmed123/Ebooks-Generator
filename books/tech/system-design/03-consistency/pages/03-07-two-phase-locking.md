## Two-phase locking (2PL)

- The oldest algorithm for enforcing Serializable isolation is **Two-Phase Locking (2PL)**. For decades, it was the only way to achieve true serializability
- Under 2PL, if Transaction A reads a row, and Transaction B wants to write to it, Transaction B must wait. If Transaction A writes to a row, and Transaction B wants to read it, Transaction B must wait. **Writers block readers, and readers block writers**

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

- "Two-phase" refers to the life of the locks:
  1. **Growing phase**: The transaction acquires locks as it reads and writes rows.
  2. **Shrinking phase**: The transaction drops *all* locks at the exact moment of `COMMIT` or `ROLLBACK`.
- Do not confuse Two-Phase *Locking* (2PL) with Two-Phase *Commit* (2PC). 2PL is for single-node isolation; 2PC is for multi-node durability

### The failure

- Throughput collapse under skew. Because readers block writers and writers block readers, a single hot row brings the database to its knees. If one analyst runs a 5-minute report that aggregates the `users` table, no one can sign up for 5 minutes
