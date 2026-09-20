# Module 1 - What a transaction promises

## Why transactions exist

- A transfer is two writes: debit one account, credit another. The process can die between them, the disk can fill, the connection can drop. Each gap is a different half-done state
- A **transaction** groups the writes so there are exactly two outcomes: all of them took effect, or none did. The application no longer has to enumerate the crash points

<svg viewBox="0 0 460 140" role="img" aria-label="A timeline of a crash. Without transactions, a crash after step 1 leaves money missing. With transactions, the database undoes step 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="20" y="20" font-weight="bold">Without Transactions</text>
  <rect x="20" y="30" width="120" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="44" text-anchor="middle">1. Debit Alice ($100)</text>
  
  <path d="M70 55 L70 75" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M65 60 L75 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M75 60 L65 70" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="85" y="68" font-size="7" fill="#b8541a" font-weight="bold">Power Outage</text>
  
  <rect x="20" y="80" width="120" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="80" y="94" text-anchor="middle" fill="#6b6b6b">2. Credit Bob ($100)</text>
  
  <text x="20" y="115" font-weight="bold" fill="#b8541a">Result: Money is destroyed.</text>
  
  <text x="240" y="20" font-weight="bold">With Transactions</text>
  <rect x="240" y="30" width="120" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="300" y="44" text-anchor="middle">1. Debit Alice ($100)</text>
  
  <path d="M290 55 L290 75" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M285 60 L295 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M295 60 L285 70" stroke="#b8541a" fill="none" stroke-width="2"/>
  
  <rect x="240" y="80" width="120" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="300" y="94" text-anchor="middle" fill="#6b6b6b">2. Credit Bob ($100)</text>
  
  <text x="240" y="115" font-weight="bold" fill="#1d4e89">Result: DB undoes Step 1.</text>
  <text x="240" y="125" font-size="7">Nothing happened.</text>
</svg>

- **ACID** names four separate promises: atomicity, consistency, isolation, durability. They are not one switch. Each has a different owner and a different cost, and the next four pages take them one at a time
- "Transaction" also names something weaker in many stores: a write that is atomic for one key only (page 6)

### The failure

- The debit commits, the process dies, the credit never runs. No error reaches anyone; the debit looked like a success. The money is missing until a reconciliation job notices, and by then other code has read the balance
