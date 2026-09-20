# Module 8 - Partitioning

## Why partition

- One node ends: its disk, its RAM for indexes, its write throughput. Replication (Module 5) copies the whole dataset, so it does not help with any of the three
- **Partitioning** (sharding, in most products) splits the keyspace so each node owns a subset. Ten nodes, ten times the disk and, if the writes spread, ten times the write throughput

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

- The two compose. A partition is a logical unit; physically it is a replica set of its own, a leader and followers or N leaderless copies. One machine can lead partition 1 and follow partition 2
- Partitioning alone makes availability worse: five unreplicated shards are five single points of failure, and any one of them takes a fifth of the keys offline

### The failure

- Three replicas of one partition in the same rack. The top-of-rack switch fails and the partition is gone with all three copies intact. Replica placement has to know about racks and zones; Cassandra's rack-aware snitch and every cloud's availability zones exist for this
