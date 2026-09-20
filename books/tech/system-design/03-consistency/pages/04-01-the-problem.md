# Module 4 - Transactions across services

## Why one transaction cannot span services

- A transaction is a promise one database makes about its own log. Split the writes across two services, each with its own database, and the network sits between them. No `COMMIT` covers both
- The running example for this module: place an order, charge the card, reserve the stock. Three services, three databases, one business action

<svg viewBox="0 0 460 140" role="img" aria-label="The distributed transaction problem. An order succeeds, a payment succeeds, but the network drops the request to the inventory service. The system is now inconsistent." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="70" text-anchor="middle" font-weight="bold">Checkout API</text>
  <text x="70" y="80" text-anchor="middle" font-size="6">try { ... } catch { ? }</text>
  
  <rect x="180" y="20" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="34" text-anchor="middle" font-size="7">Order DB</text>
  
  <rect x="180" y="60" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="74" text-anchor="middle" font-size="7">Payment DB</text>
  
  <rect x="180" y="100" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="220" y="114" text-anchor="middle" font-size="7" fill="#6b6b6b">Inventory DB</text>
  
  <path d="M120 60 L180 30" stroke="#1d4e89" fill="none"/><path d="M180 30 l-6 1 v5 z" fill="#1d4e89" transform="rotate(-30 180 30)"/>
  <text x="145" y="40" font-size="6" fill="#1d4e89">1. Created</text>
  
  <path d="M120 70 L180 70" stroke="#1d4e89" fill="none"/><path d="M180 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="150" y="66" font-size="6" fill="#1d4e89">2. Charged</text>
  
  <path d="M120 80 L160 100" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M155 105 L165 95" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M165 105 L155 95" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="135" y="105" font-size="6" fill="#b8541a" font-weight="bold">3. Timeout!</text>
  
  <text x="300" y="34" font-weight="bold" fill="#b8541a">Inconsistent State</text>
  <text x="300" y="50" font-size="7">The user was charged,</text>
  <text x="300" y="60" font-size="7">but the inventory was</text>
  <text x="300" y="70" font-size="7">never reserved.</text>
  <text x="300" y="85" font-size="7">The Checkout API cannot</text>
  <text x="300" y="95" font-size="7">reach inside the Payment DB</text>
  <text x="300" y="105" font-size="7">and run a ROLLBACK.</text>
</svg>

- The first write commits; the request to the second is lost, or the second commits and the caller crashes before the third. Each gap is a state the business never defined: a paid order with no stock reserved, a reservation for an order nobody paid for
- The rest of this module is the two answers: make the databases agree before any of them commits (2PC), or let each commit and make the sequence recoverable (sagas)

### The failure

- Three HTTP calls in a `try`, with the `catch` undoing them. The undo runs only if the process survives to run it. Kill the process between call two and the catch and nothing undoes anything; and even alive, the catch's own calls can fail. A cleanup that lives only in memory is not a cleanup
