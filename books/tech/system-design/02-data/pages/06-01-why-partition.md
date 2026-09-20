# Module 6 - Partitioning (Part 1)

## Why partition

- A single node, no matter how large, eventually runs out of CPU for queries, RAM for indexes, disk space for data, or network bandwidth for writes. When you hit the ceiling of vertical scaling, you must split the data across multiple machines
- This is called **partitioning** (or **sharding**). Each node owns a subset of the total keyspace. If you partition a database across 10 nodes, you theoretically get 10× the storage and 10× the write throughput

<svg viewBox="0 0 460 140" role="img" aria-label="Partitioning and replication compose. A dataset is split into Partition 1 and Partition 2. Each partition has its own Leader and two Followers." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="5" width="100" height="130" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="230" y="17" text-anchor="middle" font-size="7" fill="#6b6b6b">Logical Database</text>
  
  <rect x="20" y="30" width="140" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="47" text-anchor="middle" font-weight="bold">Partition 1 (A-M)</text>
  <text x="90" y="62" text-anchor="middle" font-size="7">Replica Set: L1, F1a, F1b</text>
  
  <rect x="300" y="30" width="140" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="370" y="47" text-anchor="middle" font-weight="bold">Partition 2 (N-Z)</text>
  <text x="370" y="62" text-anchor="middle" font-size="7">Replica Set: L2, F2a, F2b</text>
  
  <path d="M160 50 L200 50" stroke="#1a1a1a" fill="none"/><path d="M200 50 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M260 50 L300 50" stroke="#1a1a1a" fill="none"/><path d="M300 50 l-3 -3 v6 z" fill="#1a1a1a"/>
</svg>

- **Partitioning and replication compose**: Partitioning solves the storage and write-throughput problem. It does *not* solve the high-availability problem. If Partition 1 lives on exactly one server, and that server dies, half your database is gone
- Therefore, every partitioned database is also a replicated database. A "partition" is a logical concept. Physically, Partition 1 is a replica set (e.g., one leader and two followers). The same physical machine might even host Follower A for Partition 1 and Leader B for Partition 2

### The failure

- Treating partitioning as a replacement for replication. If you split your data across 5 shards without replicating those shards, you have multiplied your failure rate by 5. If any one of the 5 nodes has a hardware failure, the system is globally degraded
- Another failure mode is placing all replicas of a single partition inside the same physical server rack. A top-of-rack switch failure takes the entire partition offline, even if you paid for 3 copies
