## Read Committed

- **Read Committed** is Postgres's default. Its promise is exactly two lines: no dirty reads, no dirty writes. Each **statement** sees a snapshot taken when that statement starts; the next statement in the same transaction sees a newer one

```sql
-- Session A                          -- Session B
BEGIN;                                BEGIN;
UPDATE users SET plan = 'PRO'
  WHERE id = 7;
                                      SELECT plan FROM users WHERE id = 7;   -- 'FREE'
COMMIT;
                                      SELECT plan FROM users WHERE id = 7;   -- 'PRO'
```

- Session B's two reads disagree inside one transaction. That is the **non-repeatable read**, also called **read skew** when it spans rows: half the state from before a change, half from after

<svg viewBox="0 0 460 140" role="img" aria-label="Non-repeatable read (Read Skew). Tx A transfers $100 from Alice to Bob. A backup running concurrently reads Alice's old balance ($500) and Bob's new balance ($200). The total money appears to be $700 instead of $600." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="34" text-anchor="middle" font-weight="bold">Tx B (Long Backup)</text>
  
  <rect x="20" y="55" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="69" text-anchor="middle" font-size="7">Read Alice = $500</text>
  
  <rect x="240" y="55" width="100" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="290" y="69" text-anchor="middle" font-weight="bold">Tx A (Transfer $100)</text>
  
  <rect x="240" y="80" width="100" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="290" y="94" text-anchor="middle" font-size="7">Alice = $400, Bob = $200</text>
  <text x="350" y="94" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">COMMIT</text>
  
  <rect x="20" y="105" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="119" text-anchor="middle" font-size="7">Read Bob = $200</text>
  
  <path d="M125 65 L235 85" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M235 85 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(15 235 85)"/>
  <path d="M235 95 L125 115" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M125 115 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(15 125 115)"/>
  
  <text x="370" y="65" font-weight="bold" fill="#b8541a">The Skew</text>
  <text x="370" y="77" font-size="7">The backup recorded</text>
  <text x="370" y="87" font-size="7">$500 + $200 = $700.</text>
  <text x="370" y="97" font-size="7">It invented $100.</text>
</svg>

### The failure

- A hand-rolled export or report at Read Committed. It reads `accounts` at 12:00 and `payments` at 12:10; a transfer at 12:05 is in one table and not the other, and the totals do not add up. `pg_dump` avoids this by taking one snapshot for the whole run; the script that copies tables one `SELECT` at a time does not
