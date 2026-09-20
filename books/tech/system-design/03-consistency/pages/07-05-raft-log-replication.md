## Raft: log replication

- A client sends a command to the leader. The leader appends it to its own log and sends `AppendEntries` to every follower in parallel. Once a **majority** of nodes has stored the entry, the leader marks it **committed**, applies it, and answers the client. Followers learn the commit index from the next `AppendEntries` and apply up to it

<svg viewBox="0 0 460 120" role="img" aria-label="Leader and two followers with logs. Entry 5 is on the leader and follower A: a majority of three, so it is committed. Entry 6 is on the leader only: not committed. Follower B still has an old entry 5 from a previous term, which the leader will overwrite." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g font-size="7.5">
    <text x="10" y="30">leader</text>
    <text x="10" y="64">follower A</text>
    <text x="10" y="98">follower B</text>
    <text x="80" y="14" text-anchor="middle" font-size="7">index 3</text><text x="126" y="14" text-anchor="middle" font-size="7">4</text><text x="172" y="14" text-anchor="middle" font-size="7">5</text><text x="218" y="14" text-anchor="middle" font-size="7">6</text>
    <rect x="60" y="20" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="80" y="31" text-anchor="middle">t2 x=1</text>
    <rect x="106" y="20" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="126" y="31" text-anchor="middle">t2 y=4</text>
    <rect x="152" y="20" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="172" y="31" text-anchor="middle">t3 x=2</text>
    <rect x="198" y="20" width="40" height="16" fill="#fff" stroke="#b8541a" stroke-dasharray="2 2"/><text x="218" y="31" text-anchor="middle">t3 z=0</text>
    <rect x="60" y="54" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="80" y="65" text-anchor="middle">t2 x=1</text>
    <rect x="106" y="54" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="126" y="65" text-anchor="middle">t2 y=4</text>
    <rect x="152" y="54" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="172" y="65" text-anchor="middle">t3 x=2</text>
    <rect x="60" y="88" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="80" y="99" text-anchor="middle">t2 x=1</text>
    <rect x="106" y="88" width="40" height="16" fill="#e2fcf3" stroke="#1d4e89"/><text x="126" y="99" text-anchor="middle">t2 y=4</text>
    <rect x="152" y="88" width="40" height="16" fill="#fce4e2" stroke="#b8541a"/><text x="172" y="99" text-anchor="middle">t2 q=9</text>
  </g>
  <line x1="195" y1="8" x2="195" y2="108" stroke="#1d4e89" stroke-dasharray="3 2"/>
  <text x="195" y="118" text-anchor="middle" font-size="7" fill="#1d4e89">commit index 5: on a majority</text>
  <text x="256" y="26" font-size="7" fill="#b8541a">6: leader only, not committed;</text>
  <text x="256" y="35" font-size="7" fill="#b8541a">the client has no answer yet</text>
  <text x="256" y="60" font-size="7">5 on leader + A = 2 of 3: committed,</text>
  <text x="256" y="69" font-size="7">even though B lacks it</text>
  <text x="256" y="94" font-size="7" fill="#b8541a">B's entry 5 is from a lost term 2 leader;</text>
  <text x="256" y="103" font-size="7" fill="#b8541a">AppendEntries fails the term check, leader</text>
  <text x="256" y="112" font-size="7" fill="#b8541a">backs up one index and overwrites it</text>
</svg>

- Each `AppendEntries` carries the index and term of the entry just before the new ones. A follower whose log disagrees at that position rejects; the leader steps its pointer back one index and retries until the logs match, then the follower deletes everything after the match point and takes the leader's entries. A leader never deletes or overwrites entries in its own log; only followers are corrected
- The ack the client receives means "stored on a majority", not "applied everywhere". Followers apply later; a read at a follower is stale until they do (page 7)

:::interview
"What happens if the leader dies mid-write?" — The client gets no answer, so it does not know. If the entry reached a majority, the next leader has it (page 6) and commits it once it commits its own first entry; the write survives. If it reached fewer, the new leader may never have it and it is discarded. Either way the client retries with the same idempotency key (booklet 01) and the system applies it once.
:::

### The failure

- Treating "written to the leader" as committed. Entry 6 in the diagram is durable on one disk. If that disk's node loses the next election, the entry is overwritten by the winner's log, and any reader who was shown it saw a value that never existed
