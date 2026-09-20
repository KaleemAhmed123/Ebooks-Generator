## There is no cross-service transaction

- A relational database guarantees that all statements in a transaction either commit together or roll back together. In a microservices architecture, you lose this guarantee. There is no `BEGIN TRANSACTION` that spans HTTP calls
- When you need to update data in two different services atomically, you have three choices:
  1. **Redraw the boundary**: If they must update together synchronously, they belong in the same service (a wider boundary)
  2. **The Outbox Pattern**: Service A updates its database and writes an event to a local `outbox` table in the same transaction. A background worker forwards the event to Service B
  3. **The Saga Pattern**: A sequence of local transactions. If one step fails, you run compensating transactions to undo the previous steps

<svg viewBox="0 0 460 140" role="img" aria-label="Wider boundary vs Saga. Wider boundary shows one box wrapping two tables. Saga shows two boxes with events and compensations." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="160" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="100" y="35" text-anchor="middle" font-weight="bold">1. Wider Boundary</text>
  <rect x="40" y="50" width="120" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="65" text-anchor="middle">One DB Transaction</text>
  <text x="100" y="85" text-anchor="middle">A &amp; B</text>

  <text x="330" y="20" text-anchor="middle" font-weight="bold">2. Saga / Outbox</text>
  <rect x="240" y="30" width="70" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="275" y="54" text-anchor="middle">Service A</text>
  
  <rect x="370" y="30" width="70" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="405" y="54" text-anchor="middle">Service B</text>
  
  <path d="M310 40 L370 40" stroke="#1a1a1a" fill="none"/>
  <path d="M370 40 l-5 -3 v6 z" fill="#1a1a1a"/>
  <text x="340" y="35" text-anchor="middle" font-size="7">Event</text>
  
  <path d="M370 60 L310 60" stroke="#cc0000" fill="none" stroke-dasharray="2"/>
  <path d="M310 60 l5 -3 v6 z" fill="#cc0000"/>
  <text x="340" y="70" text-anchor="middle" font-size="7" fill="#cc0000">Compensate</text>
  
  <text x="340" y="100" text-anchor="middle">Eventually Consistent</text>
</svg>

- Both Outbox and Saga are asynchronous and eventually consistent. (These patterns are covered in detail in the Events booklet)

### The failure

- The failure mode is attempting Two-Phase Commit (2PC) over HTTP. You tell Service B to "prepare" its write, and hold a lock open while waiting for Service A to commit
- If the network drops the commit message, Service B holds its lock forever. You have built a system that combines the latency of the network with the lock contention of a database
