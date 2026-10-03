## Booklet 3 — what you can now do

- **Reason from partial failure**: treat "no reply" as *unknown*, not dead, and design for the ambiguity that drives idempotency, fencing, and split-brain prevention.
- **Order events without trusting clocks** (logical and vector clocks), and know why **LWW** can silently lose data.
- **Choose a replication and partitioning scheme** — leader/multi-leader/leaderless, quorum `R+W>N`, hash vs range, consistent hashing — and defend it against hot keys and failover risk.
- **Place a system on the consistency spectrum** and state its **CAP/PACELC** trade precisely: C-vs-A only under partition, latency-vs-consistency the rest of the time.
- **Explain consensus and Raft** end to end (election, log replication, safety) and why etcd/quorums make Kubernetes' control plane correct — including why an even split halts.
- **Build correct cross-service workflows**: sagas with compensations, exactly-once *effect* via at-least-once + idempotency keys, and the **outbox + CDC** pattern for the dual-write problem.
- **Keep it up under stress**: timeouts, backoff+jitter, circuit breakers, bulkheads, backpressure, load shedding, and **Little's Law** to size pools and understand why p99 explodes near saturation.

<svg viewBox="0 0 360 60" role="img" aria-label="The booklet's arc from partial failure and clocks, through replication, partitioning, consistency and consensus, to transactions and resilience" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="6" y="22" width="52" height="16" rx="2" fill="#eef2f8" stroke="#1f487e"/><text x="32" y="33" text-anchor="middle">failure·time</text>
  <rect x="64" y="22" width="60" height="16" rx="2" fill="#e6edf5" stroke="#1f487e"/><text x="94" y="33" text-anchor="middle">replication</text>
  <rect x="130" y="22" width="58" height="16" rx="2" fill="#eef2f8" stroke="#1f487e"/><text x="159" y="33" text-anchor="middle">partition</text>
  <rect x="194" y="22" width="70" height="16" rx="2" fill="#e6edf5" stroke="#1f487e"/><text x="229" y="33" text-anchor="middle">consistency·CAP</text>
  <rect x="270" y="22" width="48" height="16" rx="2" fill="#eef2f8" stroke="#1f487e"/><text x="294" y="33" text-anchor="middle">consensus</text>
  <rect x="324" y="22" width="30" height="16" rx="2" fill="#dfe9d9" stroke="#2f7d4f"/><text x="339" y="33" text-anchor="middle">resilience</text>
</svg>

- **Next booklet:** *Data Systems: Storage Engines to Streaming* — the replication, partitioning, and consistency ideas you just learned, made concrete in the databases, caches, and logs (B-trees vs LSM, Postgres, DynamoDB, Cassandra, Kafka) you choose and operate.
