## Write skew

- **Write skew**: two transactions each read a set of rows, each decide from what they read, each write a **different** row; together the writes break a rule the reads had checked. Neither wrote the other's row, so no lock or version check ever fired
- It is a lost update generalised from one row to a rule across rows, and no level below Serializable prevents it, in Postgres or InnoDB

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

- The pattern is the phantom's, with an update instead of an insert: check a premise, decide, write, and the write invalidates the other transaction's premise. Same shape: two on-call doctors going off duty, two withdrawals from a shared budget, two edits claiming the same username with no unique index

### The failure

- Reaching for `UNIQUE`. It fixes the username case and nothing else, because "at least one doctor on call" is not a uniqueness rule. What works: lock the rows the check read (`SELECT … FOR UPDATE` on both doctors' rows), which serialises the two checks; or Serializable, which sees the read-write cycle and aborts one side (Module 3, page 7). When the check reads rows that do not exist, page 10
