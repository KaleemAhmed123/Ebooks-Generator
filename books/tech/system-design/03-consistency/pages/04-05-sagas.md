## Sagas: a sequence of local transactions

- A **saga** replaces one distributed transaction with a sequence of local ones, T1 … Tn, each committing in its own database and releasing its locks. If Tk fails, the saga runs **compensating transactions** Ck−1 … C1 that undo the business effect of what already committed
- Garcia-Molina and Salem defined it in 1987: the system guarantees either every Ti completes or the compensations run. That is the whole promise: atomic in the end, never isolated

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

- Two recovery directions. **Backward**: compensate what committed, as in the diagram. **Forward**: keep retrying the failed step from its save-point until it succeeds, for steps whose effect cannot be undone
- Every step and every compensation must be idempotent, because the runner retries both after a crash (page 9); booklet 01 has the mechanics

### The failure

- Expecting the compensation to make the interval disappear. Between T2 committing and C2 committing the card is charged and the order is cancelled, and every other transaction can see that state. The compensation is a new transaction, not a rollback, and the next two pages are about living with what happens in between
