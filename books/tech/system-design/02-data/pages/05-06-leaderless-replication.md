## Leaderless replication

- In Dynamo and Cassandra, there is no leader. The client sends its write directly to multiple replicas. The write is considered successful once a quorum ($W$) acknowledges it
- To read, the client requests data from multiple replicas ($R$). Because some replicas might have missed the write, the client compares the version numbers and returns the newest one

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

- **The math**: As long as $W + R > N$, you are guaranteed to read the latest data, because the set of nodes you wrote to must overlap with the set of nodes you read from. This is called a strict quorum
- Dynamo uses a **sloppy quorum**. If the target nodes are unreachable, it writes the data to the first healthy nodes it can find (even if they don't own the data), with a "hint" to deliver it later (**hinted handoff**)

### The failure

- Setting Cassandra's consistency level to `ANY`. `ANY` means the write succeeds if it hits a hinted handoff node. But if that node dies before delivering the hint, the data is completely lost. It provides no quorum guarantees
