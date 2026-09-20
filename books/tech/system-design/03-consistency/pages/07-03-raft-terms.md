## Raft: terms

- Raft divides time into **terms**, numbered and increasing. Each term starts with an election; at most one leader wins it; a term with no winner is followed by a new term. A term number is a logical clock (Module 9, page 4): it says "before" or "after", never "when"
- Every message carries the sender's term. A node that sees a higher term than its own adopts it and steps down to follower at once. A node that receives a message with a lower term rejects it. That one rule retires stale leaders without a clock

<svg viewBox="0 0 460 110" role="img" aria-label="A timeline of terms. Term 1 has an election then a leader. Term 2 has an election with a split vote and no leader. Term 3 elects a new leader. Below, the old leader from term 1 wakes from a pause, still in term 1, sends an append, and is rejected by a follower in term 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="20" width="30" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="25" y="33" text-anchor="middle" font-size="7">elect</text>
  <rect x="40" y="20" width="130" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="105" y="33" text-anchor="middle">term 1: leader S1</text>
  <rect x="170" y="20" width="40" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="190" y="33" text-anchor="middle" font-size="7">term 2</text>
  <text x="190" y="50" text-anchor="middle" font-size="6.5">split vote,</text><text x="190" y="58" text-anchor="middle" font-size="6.5">no leader</text>
  <rect x="210" y="20" width="30" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="225" y="33" text-anchor="middle" font-size="7">elect</text>
  <rect x="240" y="20" width="210" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="345" y="33" text-anchor="middle">term 3: leader S2</text>
  <text x="450" y="14" text-anchor="end" font-size="7">time →</text>
  <rect x="120" y="72" width="130" height="16" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="3 2"/>
  <text x="185" y="83" text-anchor="middle" font-size="7">S1 paused (GC, VM freeze)</text>
  <path d="M250 80 H320" stroke="#b8541a" fill="none"/><path d="M320 80 l-5 -2.5 v5 z" fill="#b8541a"/>
  <text x="285" y="76" text-anchor="middle" font-size="6.5" fill="#b8541a">AppendEntries, term 1</text>
  <rect x="322" y="70" width="128" height="20" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="386" y="83" text-anchor="middle" font-size="7">follower in term 3: reject</text>
  <text x="120" y="104" font-size="7">S1 learns of term 3 from the reply and steps down</text>
</svg>

- Term numbers are persisted before use. A node that crashes and restarts must not vote twice in one term or lead a term it already lost; `currentTerm` and `votedFor` go to disk before any reply
- This is the same device as a fencing token (Module 8, page 4), Kafka's leader epoch, and ZooKeeper's epoch in the high 32 bits of a `zxid`: a monotonic number that lets the receiver reject a sender from the past

### The failure

- A paused old leader that wakes and keeps writing. Without terms it would succeed: its followers still know it. With terms, its first message carries term 1 into a term-3 cluster and is refused, and the reply tells it to step down. The pause is not prevented; its consequences are
