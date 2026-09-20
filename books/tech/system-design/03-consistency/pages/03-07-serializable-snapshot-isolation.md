## Serializable Snapshot Isolation (SSI)

- **SSI** is Postgres's Serializable (since 9.1). It runs every transaction on a snapshot, as Repeatable Read does, and adds bookkeeping: which rows each transaction read, which it wrote, and the **read-write dependencies** between them

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

- The pattern it hunts is the write skew shape: A read something B later wrote, and B read something A later wrote, a cycle of two rw-edges. When a commit would complete such a cycle, Postgres aborts one transaction with `40001`, "could not serialize access due to read/write dependencies among transactions"
- Nobody blocks. Readers still never wait for writers; the price moved from waiting to the occasional abort, which is why Module 1, page 8's loop is mandatory at this level, on every transaction, including read-only ones

### The failure

- Aborts for conflicts that were not real. The tracking is approximate; Postgres may lock a page or a whole table instead of a row when its predicate-lock memory runs short, and then aborts transactions that could have committed. Under load the abort rate is the metric to watch, and the `max_pred_locks_per_*` settings the knobs
