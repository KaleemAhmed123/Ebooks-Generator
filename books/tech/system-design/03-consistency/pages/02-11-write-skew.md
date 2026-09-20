## Write skew

- **Write skew** is a generalization of the lost update anomaly. A lost update occurs when two transactions concurrently modify the *exact same row*. Write skew occurs when two transactions concurrently modify *different rows*, but the combination of those two modifications violates a shared business rule
- No isolation level below Serializable prevents write skew. `SELECT FOR UPDATE` cannot prevent it, because the two transactions are locking different rows

<svg viewBox="0 0 460 140" role="img" aria-label="Write skew. Alice and Bob both check if the hospital has on-call doctors. Both see a count of 2. Both decide to go home, updating their own row. The count drops to 0, violating the rule that at least 1 doctor must be on call." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="80" y="34" text-anchor="middle" font-weight="bold">Tx A (Alice clicks Leave)</text>
  <rect x="20" y="45" width="120" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="59" text-anchor="middle" font-size="7">SELECT count(*) = 2</text>
  
  <rect x="260" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="320" y="34" text-anchor="middle" font-weight="bold">Tx B (Bob clicks Leave)</text>
  <rect x="260" y="60" width="120" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="320" y="74" text-anchor="middle" font-size="7">SELECT count(*) = 2</text>
  
  <rect x="20" y="85" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="99" text-anchor="middle" font-size="7">UPDATE Alice SET on_call = f</text>
  <text x="145" y="99" text-anchor="middle" font-size="6" font-weight="bold" fill="#1d4e89">COMMIT</text>
  
  <rect x="260" y="105" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="320" y="119" text-anchor="middle" font-size="7">UPDATE Bob SET on_call = f</text>
  <text x="385" y="119" text-anchor="middle" font-size="6" font-weight="bold" fill="#1d4e89">COMMIT</text>
  
  <text x="200" y="45" font-weight="bold" fill="#b8541a">The Rule</text>
  <text x="200" y="55" font-size="6">Must have >= 1 on call.</text>
  
  <path d="M145 55 L255 70" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  <text x="200" y="85" font-weight="bold" fill="#b8541a">The Skew</text>
  <text x="200" y="95" font-size="6">Both transactions succeed.</text>
  <text x="200" y="105" font-size="6">Final count is 0.</text>
</svg>

- **The pattern**: Write skew always follows the exact same pattern.
  1. A query checks a premise (are there enough doctors? is the username taken?).
  2. The application code makes a decision based on that premise.
  3. The application writes to the database, which *invalidates the premise* for the other concurrent transaction

### The failure

- Assuming unique constraints fix everything. If the premise is "this username is not taken", a `UNIQUE` constraint solves the problem perfectly. But if the premise is "there are enough doctors", "the budget is not exceeded", or "the room is not double-booked", the database `UNIQUE` keyword cannot help you. You are completely vulnerable to write skew
