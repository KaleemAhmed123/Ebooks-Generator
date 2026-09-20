## Dirty write

- A **dirty write** occurs when two transactions concurrently update the exact same row, and Transaction B overwrites Transaction A's uncommitted value
- Every isolation level in modern databases prevents dirty writes. If they didn't, the database could not safely roll back transactions

<svg viewBox="0 0 460 140" role="img" aria-label="Dirty write. Tx A updates Car to Alice. Tx B updates Car to Bob, overwriting Alice's uncommitted write. Tx A then updates Invoice to Alice, while Tx B updates Invoice to Bob. The final state is mixed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="80" y="34" text-anchor="middle" font-weight="bold">Tx A (Buyer: Alice)</text>
  <rect x="20" y="45" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="59" text-anchor="middle" font-size="7">1. UPDATE Car SET owner=Alice</text>
  
  <rect x="260" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="320" y="34" text-anchor="middle" font-weight="bold">Tx B (Buyer: Bob)</text>
  <rect x="260" y="65" width="120" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="79" text-anchor="middle" font-size="7">2. UPDATE Car SET owner=Bob</text>
  
  <rect x="20" y="85" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="99" text-anchor="middle" font-size="7">3. UPDATE Invoice SET buyer=Alice</text>
  
  <rect x="260" y="105" width="120" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="119" text-anchor="middle" font-size="7">4. UPDATE Invoice SET buyer=Bob</text>
  
  <path d="M145 55 L255 75" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M255 75 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-10 255 75)"/>
  <text x="200" y="62" text-anchor="middle" font-size="6">Dirty write</text>
</svg>

- **The mixed-state problem**: In the scenario above, Alice bought a car and generated an invoice. Bob bought the exact same car a millisecond later. Bob's write to the `Car` table overwrote Alice's write before Alice committed. But Alice's write to the `Invoice` table executed *before* Bob's
- The final state is broken: Bob owns the car, but Alice is paying the invoice. The winner of the first table was the loser of the second

### The failure

- Thinking that preventing dirty writes prevents lost updates. Preventing dirty writes only stops you from overwriting an *uncommitted* value (using row locks to force B to wait for A). It does absolutely nothing to stop you from overwriting a *committed* value (which is a lost update)
