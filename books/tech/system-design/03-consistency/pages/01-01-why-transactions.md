# Module 1 - What a transaction promises

## Why transactions exist

- The hardware running your database will fail. The network will drop packets. The application will crash halfway through executing a function. If you are writing a banking application, you cannot allow a crash between debiting Account A and crediting Account B
- Transactions exist to turn many partial-failure scenarios into exactly two outcomes: either the entire operation succeeds, or it fails safely and cleanly. A transaction provides an abstraction over hardware failures

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

- **The promise**: A transaction provides safety guarantees (commonly known as ACID). It allows application developers to write code assuming that the database will magically handle concurrent execution and partial failures
- **The reality**: ACID guarantees are not a binary switch. Different databases implement different definitions of the letters. If you do not understand the exact level of isolation your database provides, you will write bugs that destroy data

### The failure

- Writing critical multi-step operations without a transaction. If a crash occurs between debiting and crediting, the money is destroyed. Neither you, nor the database, nor the user knows which half of the operation ran
