## Deadlocks are detected, not prevented

- A **deadlock**: transaction A holds row 1 and waits for row 2; B holds row 2 and waits for row 1. Neither can finish, so neither releases. Databases let it happen and break it: find the cycle in the wait-for graph, abort one transaction, let the other proceed

<svg viewBox="0 0 460 140" role="img" aria-label="A deadlock cycle. Tx A locks User 1 and waits for User 2. Tx B locks User 2 and waits for User 1. The database detects the cycle and aborts Tx B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="30" width="100" height="30" rx="15" fill="#fff" stroke="#1d4e89" stroke-width="2"/>
  <text x="100" y="49" text-anchor="middle" font-weight="bold">Transaction A</text>
  
  <rect x="310" y="30" width="100" height="30" rx="15" fill="#fff" stroke="#b8541a" stroke-width="2"/>
  <text x="360" y="49" text-anchor="middle" font-weight="bold">Transaction B</text>
  
  <rect x="180" y="80" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="94" text-anchor="middle">Row: User 1</text>
  
  <rect x="180" y="105" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="119" text-anchor="middle">Row: User 2</text>
  
  <!-- Tx A locks User 1 -->
  <path d="M120 60 L180 85" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 85 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(30 180 85)"/>
  <text x="135" y="85" font-size="6" fill="#1d4e89" font-weight="bold">Holds lock</text>
  
  <!-- Tx B locks User 2 -->
  <path d="M340 60 L280 110" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M280 110 l6 -3 v6 z" fill="#b8541a" transform="rotate(-30 280 110)"/>
  <text x="325" y="110" font-size="6" fill="#b8541a" font-weight="bold">Holds lock</text>
  
  <!-- Tx A waits for User 2 -->
  <path d="M100 60 L180 115" stroke="#1d4e89" fill="none" stroke-dasharray="3 3" stroke-width="2"/><path d="M180 115 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(45 180 115)"/>
  <text x="110" y="110" font-size="6" fill="#1d4e89">Waits for</text>
  
  <!-- Tx B waits for User 1 -->
  <path d="M360 60 L280 90" stroke="#b8541a" fill="none" stroke-dasharray="3 3" stroke-width="2"/><path d="M280 90 l6 -3 v6 z" fill="#b8541a" transform="rotate(-45 280 90)"/>
  <text x="350" y="85" font-size="6" fill="#b8541a">Waits for</text>
  
  <text x="230" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">DEADLOCK CYCLE DETECTED</text>
</svg>

- Postgres runs the check only after a lock wait has lasted `deadlock_timeout`, one second by default, because the cycle search is not free. The victim gets SQLSTATE `40P01`, "deadlock detected", and its transaction is rolled back. The application retries it whole, with the loop from Module 1, page 8
- A deadlock is not a bug in the database; it is two code paths that lock the same rows in different orders

### The failure

- `transfer(a, b)` locks the sender then the receiver. Run `transfer(1, 2)` and `transfer(2, 1)` at once: each holds one row and waits for the other. The prevention is an ordering rule: lock rows in a fixed order, smallest id first, on every code path that touches more than one
