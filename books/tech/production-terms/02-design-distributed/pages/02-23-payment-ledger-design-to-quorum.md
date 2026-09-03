## Payment Ledger Design

Money belongs in an append-only, double-entry ledger, never in a mutable balance
column. The balance is derived, and every change has a cause you can point at.

`UPDATE balance SET amount = amount - 500` destroys the history and races with
itself under concurrency. Two immutable entries that must sum to zero cannot do
either: the movement is recorded, both sides are visible, and the arithmetic
either balances or the bug is obvious.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A transfer is two immutable ledger entries of minus 500 and plus 500 that sum to zero, with the balance derived by summing entries">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="9" fill="#b32d2b">never  UPDATE balance SET amount = amount - 500</text>
  <rect x="4" y="24" width="230" height="34" fill="none" stroke="#2b5fa8" stroke-width="1.3"/>
  <text x="16" y="38" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">entry 1   account A   -500</text>
  <text x="16" y="52" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">entry 2   account B   +500</text>
  <text x="246" y="38" font-family="Georgia,serif" font-size="9.5" fill="#2b5fa8">must sum to zero</text>
  <text x="246" y="52" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">balance = SUM(entries)</text>
</svg>

Summing every entry gets slow eventually. The fix is a periodic snapshot plus
the entries since it — never a mutable column that the entries are supposed to
agree with.

## Quorum

Requiring a majority for both reads and writes, so the two sets always overlap
by at least one node that saw the most recent write.

With five replicas, writing to three and reading from three guarantees an
overlap: `R + W > N`. Dropping to one and one is much faster and gives you no
guarantee at all — the read may touch only nodes that missed the write.

The two knobs move independently. Raising `W` buys durability and costs write
latency. Raising `R` buys freshness and costs read latency. Setting both to one
is a legitimate choice for a cache and a serious mistake for a balance.
