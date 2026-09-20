## Kafka in one page

- Apache Kafka is the quintessential Partitioned Log. It abandons routing keys and queues in favor of distributed files

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

- **Topics and Partitions:** A Topic is split into Partitions. A Partition is an ordered, append-only file. Partitions allow Kafka to scale horizontally across many servers.
- **Keys:** To ensure ordering, producers attach a Key to the message. Kafka hashes the key to assign it to a specific Partition. All messages for `user123` land on Partition 0, in order.
- **Consumer Groups:** A Consumer Group coordinates reading. Each Partition is assigned to exactly one Consumer in the group. The group tracks its offset per partition.

### The failure

- `acks=all` means "all *in-sync* replicas". When configuring durability, developers think `acks=all` means "written to all 3 nodes". In reality, it means written to the *In-Sync Replica* (ISR) list. If two nodes crash, the ISR shrinks to 1 node. A write with `acks=all` will succeed, but it is only stored on one machine. To get majority durability, you must set the topic config `min.insync.replicas=2`
