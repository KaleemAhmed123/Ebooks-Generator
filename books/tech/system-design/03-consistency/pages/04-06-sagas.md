## Sagas: A sequence of local transactions

- If 2PC is banned, how do we charge a credit card and reserve inventory across two microservices? The industry-standard pattern is a **Saga**
- A saga breaks a distributed transaction down into a sequence of purely *local* transactions. Service A commits to its database (and releases its locks!). Then Service B commits to its database (and releases its locks!). Then Service C commits
- If Service C fails, we cannot run `ROLLBACK` on Service A and B, because they already committed. Instead, we must run **Compensating Transactions** (C2, C1) to undo the work

<svg viewBox="0 0 460 140" role="img" aria-label="A Saga rolling back. Tx 1 and Tx 2 succeed. Tx 3 fails. The orchestrator triggers Comp 2 to undo Tx 2, and Comp 1 to undo Tx 1. The result is backward recovery." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <!-- Forward Path -->
  <rect x="20" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="35" text-anchor="middle" font-weight="bold">Tx 1</text>
  <text x="60" y="45" text-anchor="middle" font-size="6">Order Created</text>
  
  <path d="M100 35 L140 35" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M140 35 l-4 -2 v4 z" fill="#1a1a1a"/>
  
  <rect x="140" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="35" text-anchor="middle" font-weight="bold">Tx 2</text>
  <text x="180" y="45" text-anchor="middle" font-size="6">Card Charged</text>
  
  <path d="M220 35 L260 35" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M260 35 l-4 -2 v4 z" fill="#1a1a1a"/>
  
  <rect x="260" y="20" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="300" y="35" text-anchor="middle" font-weight="bold">Tx 3</text>
  <text x="300" y="45" text-anchor="middle" font-size="6">Inventory Failed</text>
  
  <path d="M300 50 L300 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M300 70 l-2 -4 h4 z" fill="#b8541a"/>
  
  <!-- Backward Path -->
  <rect x="260" y="70" width="80" height="30" rx="3" fill="#fff" stroke="#b8541a" stroke-dasharray="2 2"/>
  <text x="300" y="85" text-anchor="middle" font-weight="bold">Abort</text>
  
  <path d="M260 85 L220 85" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M220 85 l4 -2 v4 z" fill="#b8541a"/>
  
  <rect x="140" y="70" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="180" y="85" text-anchor="middle" font-weight="bold">Comp 2</text>
  <text x="180" y="95" text-anchor="middle" font-size="6">Refund Card</text>
  
  <path d="M140 85 L100 85" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M100 85 l4 -2 v4 z" fill="#b8541a"/>
  
  <rect x="20" y="70" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="85" text-anchor="middle" font-weight="bold">Comp 1</text>
  <text x="60" y="95" text-anchor="middle" font-size="6">Cancel Order</text>
</svg>

- **Backward recovery** (shown above): If a step fails, the saga runner executes the compensating transactions in reverse order to undo the work
- **Forward recovery**: If a step fails, the saga runner simply pauses and retries that exact same step forever until the API comes back online. This is used when there is no logical way to "undo" the work

### The failure

- Expecting a compensation to instantly undo the work. A compensation is just a brand new transaction. It takes time to execute. While it is executing, the system is in an intermediate state: the user has been charged, but the order is cancelled. Other concurrent transactions will see this weird state
