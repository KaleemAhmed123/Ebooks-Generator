## Global secondary indexes

- To avoid the read penalty of scatter-gather, you can build a **global secondary index (GSI)** (or term-partitioned index). In a GSI, the index itself is partitioned by the indexed value
- If you index the `Color` column, all the red items are grouped together in one partition of the index

<svg viewBox="0 0 460 140" role="img" aria-label="Global secondary index. A write to Partition 1 updates the base table, then asynchronously sends a message to Partition 3 (which owns the 'Red' index partition)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="45" text-anchor="middle">Insert</text>
  <text x="50" y="55" text-anchor="middle" font-size="7">Apple (Red)</text>
  
  <rect x="130" y="10" width="120" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="25" text-anchor="middle" font-weight="bold">Base Table: Partition 1</text>
  <text x="190" y="37" text-anchor="middle" font-size="7">Stores "Apple"</text>
  
  <rect x="310" y="90" width="120" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="370" y="105" text-anchor="middle" font-weight="bold">GSI: Partition 3</text>
  <text x="370" y="117" text-anchor="middle" font-size="7">Owns Color="Red"</text>
  
  <path d="M80 45 L130 35" stroke="#1a1a1a" fill="none"/><path d="M130 35 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 130 35)"/>
  
  <path d="M210 50 L340 90" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/><path d="M340 90 l-6 -3 v6 z" fill="#b8541a" transform="rotate(20 340 90)"/>
  <text x="290" y="65" font-weight="bold" fill="#b8541a">Async Update</text>
  
  <text x="360" y="25" font-size="7">Read for "Color=Red"</text>
  <text x="360" y="35" font-size="7">hits ONLY Partition 3.</text>
  <text x="360" y="45" font-size="7" font-weight="bold">No scatter-gather!</text>
</svg>

- **The benefit**: Reads are extremely fast. The router knows exactly which partition owns the `Red` index term, and sends a single point-read to that node
- **The drawback**: Writes are complicated. When you insert an Apple into Base Partition 1, the `Red` index term belongs to Partition 3. A single insert now spans multiple physical nodes. To prevent the cluster from stalling, global index updates are always asynchronous (eventually consistent)

### The failure

- Creating a DynamoDB GSI without provisioning enough write capacity for the index itself. In DynamoDB, a GSI has its own capacity limits
- Because GSI updates are asynchronous, if the GSI write capacity is too low, the updates pile up in a queue. To prevent the queue from overflowing and losing data, DynamoDB protects the system by applying backpressure: it will actively throttle and reject writes to your *base table* until the GSI catches up. Your writes will fail because an index was under-provisioned
