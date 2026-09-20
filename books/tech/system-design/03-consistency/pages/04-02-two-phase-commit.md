## Two-Phase Commit (2PC)

- The oldest algorithm for achieving atomic writes across multiple databases is **Two-Phase Commit (2PC)**. It introduces a central node called the **Coordinator**
- Instead of just asking the databases to write the data, the Coordinator splits the process into two strictly enforced phases

<svg viewBox="0 0 460 140" role="img" aria-label="Two-Phase Commit. Phase 1: Prepare (databases acquire locks and promise to commit). Phase 2: Commit (coordinator logs the decision and tells them to execute)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="200" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="35" text-anchor="middle" font-weight="bold">Phase 1: Prepare</text>
  
  <circle cx="120" cy="60" r="15" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="63" text-anchor="middle" font-size="7">Coord</text>
  
  <rect x="40" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="104" text-anchor="middle" font-size="7">DB A: "Yes"</text>
  
  <rect x="140" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="170" y="104" text-anchor="middle" font-size="7">DB B: "Yes"</text>
  
  <path d="M110 70 L70 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M130 70 L170 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  
  <rect x="240" y="20" width="200" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="340" y="35" text-anchor="middle" font-weight="bold">Phase 2: Commit</text>
  
  <circle cx="340" cy="60" r="15" fill="#fff" stroke="#1d4e89"/>
  <text x="340" y="63" text-anchor="middle" font-size="7">Coord</text>
  
  <rect x="260" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="290" y="104" text-anchor="middle" font-size="7">DB A commits</text>
  
  <rect x="360" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="390" y="104" text-anchor="middle" font-size="7">DB B commits</text>
  
  <path d="M330 70 L290 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M290 90 l6 -1 v5 z" fill="#1d4e89" transform="rotate(30 290 90)"/>
  <path d="M350 70 L390 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M390 90 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-30 390 90)"/>
</svg>

- **Phase 1: Prepare**. The Coordinator asks every database: "Can you commit this?" The databases write the data to their transaction logs, acquire all necessary row locks, and reply "Yes, I promise I can."
- **Phase 2: Commit**. Once every single database says "Yes", the Coordinator durably writes the word "COMMIT" to its own disk. It then tells the databases to execute the commit and drop their locks
- The "promise" is the expensive part. By saying "Yes", the database is giving up its right to independently abort the transaction. It must hold those row locks indefinitely until the Coordinator gives the final order

### The failure

- Assuming 2PC is just two network calls. 2PC forces the databases to hold pessimistic row locks across multiple network round-trips. If the network is slow, those row locks stay open, bringing your databases to a crawl. For this reason, 2PC is almost completely banned in microservice architectures
