## Quorums: N, W, R

- Three numbers per key. **N**: how many replicas hold it. **W**: how many must acknowledge a write before the client is told it succeeded. **R**: how many are asked on a read; the newest version among the answers wins
- If `W + R > N`, the set written and the set read must share at least one replica, so a read sees at least one copy of the latest acknowledged write. Dynamo's production setting was (3, 2, 2)

<svg viewBox="0 0 460 140" role="img" aria-label="Leaderless quorum. N=3 replicas. The client writes to 2 (W=2) and reads from 2 (R=2). At least one replica is guaranteed to overlap and have the newest data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="80" y="66" text-anchor="middle">Client</text>
  
  <rect x="180" y="10" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="29" text-anchor="middle">Node 1</text>
  
  <rect x="180" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="74" text-anchor="middle">Node 2</text>
  
  <rect x="180" y="100" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="220" y="119" text-anchor="middle">Node 3 (Down)</text>
  
  <path d="M110 55 L180 30" stroke="#1d4e89" fill="none"/><path d="M180 30 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-20 180 30)"/>
  <path d="M110 62 L180 70" stroke="#1d4e89" fill="none"/><path d="M180 70 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(10 180 70)"/>
  
  <path d="M110 70 L180 110" stroke="#6b6b6b" fill="none" stroke-dasharray="2 2"/>
  
  <text x="320" y="60" font-weight="bold">Quorum math:</text>
  <text x="320" y="75" font-family="monospace">N = 3 (total replicas)</text>
  <text x="320" y="90" font-family="monospace">W = 2 (write quorum)</text>
  <text x="320" y="105" font-family="monospace">R = 2 (read quorum)</text>
  <text x="320" y="120" font-weight="bold" fill="#1d4e89">W + R &gt; N (overlap)</text>
</svg>

- The trade is latency: a write or a read is done at the W-th or R-th reply, so its latency is, in the paper's words, "dictated by the slowest of the R (or W) replicas". W = 1 makes writes fast and reads uncertain; R = 1 the reverse
- When a home replica is down, Dynamo's **sloppy quorum** writes to the next healthy node instead, with a **hint** naming the intended owner; the stand-in delivers it when the owner returns (**hinted handoff**; Cassandra keeps hints for `max_hint_window`, 3 h). Writes stay available. Overlap is no longer guaranteed

### The failure

- Reading `W + R > N` as "strongly consistent". It is not linearizable (booklet 03): two concurrent writes leave replicas disagreeing about which is newer; a write that reached W − 1 replicas and failed is neither rolled back nor acknowledged, and a read that overlaps a write in flight may or may not see it. And under a sloppy quorum, the read's R replicas may all miss the node holding the hint. The quorum bounds staleness; it does not remove it
