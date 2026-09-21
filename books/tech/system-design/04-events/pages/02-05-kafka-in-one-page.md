## Kafka in one page

- Kafka is a partitioned log with replication. There are no exchanges and no per-message state; there are files, positions and replicas

<svg viewBox="0 0 460 140" role="img" aria-label="Kafka model. A Topic is split into Partitions. Producer writes to a Partition via a Key. A Consumer Group tracks an offset per partition." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="140" y="10" width="180" height="120" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="230" y="25" text-anchor="middle" font-weight="bold" fill="#1a1a1a">Topic: "Orders"</text>
  
  <rect x="150" y="40" width="160" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="54" text-anchor="middle" font-size="6">Partition 0 (Stored on Broker A)</text>
  
  <rect x="150" y="70" width="160" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="84" text-anchor="middle" font-size="6">Partition 1 (Stored on Broker B)</text>
  
  <rect x="150" y="100" width="160" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="114" text-anchor="middle" font-size="6">Partition 2 (Stored on Broker C)</text>
  
  <rect x="20" y="60" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="79" text-anchor="middle" font-weight="bold">Producer</text>
  <text x="50" y="90" text-anchor="middle" font-size="6">Key: "user123"</text>
  
  <rect x="360" y="50" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="400" y="70" text-anchor="middle" font-weight="bold" fill="#b8541a">Consumer Group</text>
  <text x="400" y="85" text-anchor="middle" font-size="6" fill="#b8541a">Offset tracking</text>
  <text x="400" y="95" text-anchor="middle" font-size="6" fill="#b8541a">for all partitions</text>
  
  <path d="M80 75 L150 50" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M150 50 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-20 150 50)"/>
  
  <path d="M310 50 L360 65" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M360 65 l-6 -3 v5 z" fill="#b8541a" transform="rotate(20 360 65)"/>
  <path d="M310 80 L360 80" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M360 80 l-6 -3 v6 z" fill="#b8541a"/>
  <path d="M310 110 L360 95" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M360 95 l-6 -1 v5 z" fill="#b8541a" transform="rotate(-20 360 95)"/>
</svg>

- A **topic** is split into **partitions**, each an ordered append-only log that lives on one broker (the leader) and is copied to others (**replicas**). The replicas that are fully caught up form the **in-sync replica set, ISR**
- A record with a **key** is hashed to a partition, so every record for `user123` lands on the same partition in write order. No key: the producer fills a batch for one partition, then moves on (Module 4)
- Readers join a **consumer group**. Each partition is read by exactly one member of the group at a time, and the group's offsets are stored back in Kafka. A second group reads the same partitions independently
- A write is **committed** when every ISR replica has it; only committed records are readable. Producer `acks` and the topic's `min.insync.replicas` decide how many replicas that must be (Module 3, page 1)

### The failure

- `acks=all` read as "all replicas". It means all *in-sync* replicas, and the ISR shrinks when replicas fall behind or die. With `min.insync.replicas` at its default of 1, a topic with three replicas and two brokers down still accepts writes onto a single machine. Module 3, page 1 has the numbers
