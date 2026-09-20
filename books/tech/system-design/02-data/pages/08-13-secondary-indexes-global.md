## Global secondary indexes

- A **global secondary index** (term-partitioned) is partitioned by the indexed value, not by the row. Every red item's index entry is in the index partition that owns "red", wherever the rows themselves live

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

- A read by colour is one partition: the router knows who owns "red". No fan-out, no slowest-node latency
- A write now touches two partitions: the row's, and the index term's, on another node. Making both happen atomically would need a distributed transaction per write, so the index is updated asynchronously instead. DynamoDB's GSI is eventually consistent only, has its own partition key and sort key, and its own read and write capacity

### The failure

- An under-provisioned GSI. Index updates queue behind its write capacity, and DynamoDB's docs are explicit about what happens next: the base table's writes are throttled until the index catches up. The table had capacity to spare; the index did not; the writes failed anyway. Every GSI needs at least the table's write capacity, and a GSI on a low-cardinality value (status) is a hot index partition by construction
