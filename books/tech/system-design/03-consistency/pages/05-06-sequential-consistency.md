## Sequential consistency

- **Sequentially consistent**: there is one total order of all operations, and it respects the order each client issued its own operations. It does not respect real time between clients. Lamport, 1979
- Linearizability minus the clock. Two clients can each see a consistent history and still disagree about how far that history has progressed

<svg viewBox="0 0 460 120" role="img" aria-label="One total order of writes, w1 then w2. Client A has applied both. Client B has applied only w1, so B is behind A but never sees w2 before w1. Both views are prefixes of the same order." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="24" font-weight="bold">the one order</text>
  <rect x="110" y="12" width="60" height="18" fill="#e2fcf3" stroke="#1d4e89"/><text x="140" y="24" text-anchor="middle">w1</text>
  <rect x="176" y="12" width="60" height="18" fill="#e2fcf3" stroke="#1d4e89"/><text x="206" y="24" text-anchor="middle">w2</text>
  <rect x="242" y="12" width="60" height="18" fill="#e2fcf3" stroke="#1d4e89"/><text x="272" y="24" text-anchor="middle">w3</text>
  <text x="10" y="62">client A sees</text>
  <rect x="110" y="50" width="60" height="18" fill="#fcfcfc" stroke="#1a1a1a"/><text x="140" y="62" text-anchor="middle">w1</text>
  <rect x="176" y="50" width="60" height="18" fill="#fcfcfc" stroke="#1a1a1a"/><text x="206" y="62" text-anchor="middle">w2</text>
  <text x="250" y="62" font-size="7">at real time t</text>
  <text x="10" y="98">client B sees</text>
  <rect x="110" y="86" width="60" height="18" fill="#fcfcfc" stroke="#1a1a1a"/><text x="140" y="98" text-anchor="middle">w1</text>
  <text x="184" y="98" font-size="7">at the same real time t: allowed, B is a shorter prefix</text>
  <text x="320" y="62" font-size="7" fill="#b8541a">forbidden for anyone: w2 before w1</text>
</svg>

- ZooKeeper is the everyday example. Its guarantee list starts with sequential consistency: updates from a client apply in the order sent, every client sees the same order, and a client may read a stale prefix. The documentation says two clients need not have identical views at an instant, and gives `sync()` to force a client's view to the current state before a read
- What it is good for: configuration, membership, anything where "same order everywhere" matters more than "current everywhere". A watcher that sees w1 then w2 reacts correctly; a watcher that saw w2 first would not

### The failure

- Reading from ZooKeeper right after another process wrote, expecting the write. A read goes to the connected server, which may not have the write yet. Call `sync()` first, or design the reader to act on the watch, not on a poll
