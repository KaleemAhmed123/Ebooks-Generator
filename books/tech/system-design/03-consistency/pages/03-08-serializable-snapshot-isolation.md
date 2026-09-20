## Serializable Snapshot Isolation (SSI)

- For decades, everyone thought serializability required blocking (2PL). Then in 2008, academics invented **Serializable Snapshot Isolation (SSI)**. It is the algorithm that powers Postgres's Serializable mode
- SSI is an optimistic algorithm. It uses standard MVCC snapshot isolation (readers never block writers), but it actively tracks the dependencies between transactions. It watches for the write skew pattern: Transaction A reads data, Transaction B modifies it, and both commit

<svg viewBox="0 0 460 140" role="img" aria-label="SSI detecting a rw-dependency cycle. Tx A reads X, writes Y. Tx B reads Y, writes X. The database detects the cycle and aborts Tx B to protect Serializable isolation." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="30" width="100" height="30" rx="15" fill="#fff" stroke="#1d4e89" stroke-width="2"/>
  <text x="100" y="49" text-anchor="middle" font-weight="bold">Tx A (Reads X, Writes Y)</text>
  
  <rect x="310" y="30" width="100" height="30" rx="15" fill="#fff" stroke="#b8541a" stroke-width="2"/>
  <text x="360" y="49" text-anchor="middle" font-weight="bold">Tx B (Reads Y, Writes X)</text>
  
  <path d="M120 60 L340 60" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M340 60 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="55" text-anchor="middle" font-size="6">rw-dependency (B modified what A read)</text>
  
  <path d="M340 40 L120 40" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M120 40 l6 -3 v6 z" fill="#b8541a"/>
  <text x="230" y="35" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">rw-dependency (A modified what B read)</text>
  
  <text x="230" y="15" text-anchor="middle" font-weight="bold" fill="#b8541a">DANGEROUS CYCLE DETECTED → ABORT B</text>
  
  <rect x="180" y="80" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="94" text-anchor="middle">Data: X and Y</text>
</svg>

- If Postgres detects a dangerous cycle in the dependency graph, it knows that write skew is possible. Because it is optimistic, it does not block; it just waits to see if both transactions try to `COMMIT`. If they do, it aborts one of them with `40001 serialization failure`

### The failure

- False positives aborting innocent transactions. Tracking every read for every transaction is extremely expensive, so Postgres uses coarse-grained tracking (e.g., tracking the page instead of the row). This means Postgres will occasionally abort transactions that were perfectly safe. Any transaction running under SSI can be aborted at any time, making retry loops mandatory
