## Producer acks

- When a producer writes a message to a partitioned log (like Kafka), it needs to know if the write succeeded. It does this by asking for an Acknowledgement (`ack`). You configure the level of durability you want

<svg viewBox="0 0 460 140" role="img" aria-label="Producer acks. The Producer sends to the Leader. In acks=1, the Leader acks immediately. In acks=all, the Leader waits for Follower 1 and Follower 2 before acking." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Producer</text>
  
  <rect x="180" y="20" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="44" text-anchor="middle" font-weight="bold">Leader</text>
  
  <rect x="340" y="20" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="44" text-anchor="middle" font-weight="bold">Follower 1</text>
  
  <rect x="340" y="80" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="104" text-anchor="middle" font-weight="bold">Follower 2</text>
  
  <path d="M80 65 L180 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 40 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-15 180 40)"/>
  
  <path d="M260 40 L340 40" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M340 40 l-6 -3 v6 z" fill="#b8541a"/>
  <path d="M260 40 L340 100" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M340 100 l-6 -3 v5 z" fill="#b8541a" transform="rotate(35 340 100)"/>
  
  <path d="M180 60 L80 85" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M80 85 l6 -1 v-5 z" fill="#1a1a1a" transform="rotate(-15 80 85)"/>
  
  <text x="130" y="95" text-anchor="middle" font-size="6" font-weight="bold">Ack</text>
</svg>

- `acks=0`: The producer fires the message over the network and never looks back. Highest throughput, lowest latency, highest chance of data loss
- `acks=1`: The broker Leader writes the message to its own local disk and replies. Fast, but unsafe
- `acks=all`: The Leader waits for all *In-Sync Replicas* (followers) to copy the message before replying. The safest option, adding ~10ms of latency

### The failure

- `acks=1` loses data on leader failover. If you use `acks=1`, the Leader writes your message to disk and tells you "Success". One millisecond later, before the followers have time to copy the message, the Leader machine suffers a catastrophic hardware failure. A follower is promoted to become the new Leader. Your message is permanently gone, but your application thinks it was successfully saved
