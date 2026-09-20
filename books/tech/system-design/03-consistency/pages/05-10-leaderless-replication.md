## Leaderless replication

- Some databases completely abandon the concept of a Leader. In **Leaderless Replication** (made famous by Amazon Dynamo, and used by Cassandra and Riak), every single node accepts reads and writes
- Because there is no leader to enforce order, the database must write to multiple nodes at the same time. The client sends the write to all $N$ replicas, but only waits for $W$ of them to acknowledge the write. When reading, the client asks all $N$ replicas, and waits for $R$ of them to reply

<svg viewBox="0 0 460 140" role="img" aria-label="Leaderless replication with Quorum. Client writes to 3 nodes. Waits for 2 acknowledgments (W=2). Read requires 2 nodes (R=2)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Client</text>
  
  <circle cx="200" cy="30" r="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="34" text-anchor="middle">Node A</text>
  <text x="200" y="60" text-anchor="middle" font-size="6">Ack</text>
  
  <circle cx="200" cy="80" r="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="84" text-anchor="middle">Node B</text>
  <text x="200" y="110" text-anchor="middle" font-size="6">Ack</text>
  
  <circle cx="200" cy="130" r="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="200" y="134" text-anchor="middle">Node C</text>
  <text x="200" y="105" text-anchor="middle" font-size="6" fill="#b8541a">Timeout</text>
  
  <path d="M80 60 L180 30" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 30 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-15 180 30)"/>
  <path d="M80 70 L180 80" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 80 l-6 -2 v6 z" fill="#1d4e89" transform="rotate(5 180 80)"/>
  <path d="M80 80 L180 130" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2" stroke-width="2"/><path d="M180 130 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(25 180 130)"/>
  
  <text x="320" y="45" font-weight="bold">Quorum (W + R > N)</text>
  <text x="320" y="60" font-size="7">N = 3 (Total replicas)</text>
  <text x="320" y="70" font-size="7">W = 2 (Write acks needed)</text>
  <text x="320" y="80" font-size="7">R = 2 (Read replies needed)</text>
  <text x="320" y="95" font-size="7">If W+R > N, the read must</text>
  <text x="320" y="105" font-size="7">overlap with the write, so</text>
  <text x="320" y="115" font-size="7">at least one node has fresh data.</text>
</svg>

- **Quorum**: If $W + R > N$, you have a strict quorum. The set of nodes you wrote to must overlap with the set of nodes you read from. When you read, you might get a stale value from Node A, but a fresh value from Node B. You look at the timestamps and return the fresh value to the user

### The failure

- Assuming quorum guarantees strong consistency. Even with $W+R>N$, leaderless databases are vulnerable to edge cases. If a write succeeds on Node A but fails on B and C, the write has not met quorum. The database returns an error to the client. But Node A *still has the data*. A subsequent read might hit Node A and return the "failed" write to a user. Leaderless replication is fundamentally eventually consistent, not strongly consistent
