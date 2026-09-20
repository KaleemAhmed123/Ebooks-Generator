## Local secondary indexes

- Module 3's indexes were on one node. Partition the table and the index has to be partitioned too, and there are two ways: by the row's partition, or by the indexed value
- A **local secondary index** (document-partitioned) lives inside each partition and covers only that partition's rows. Partition 1 indexes its own items by colour; partition 2 indexes its own

<svg viewBox="0 0 460 140" role="img" aria-label="Local secondary index. The client queries 'Color=Red'. The router must scatter the query to every partition. Partition 1 and 2 check their local indexes and return results." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="70" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="55" y="65" text-anchor="middle">Find</text>
  <text x="55" y="75" text-anchor="middle" font-size="7">Color = Red</text>
  
  <rect x="180" y="20" width="130" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="245" y="35" text-anchor="middle" font-weight="bold">Partition 1 (A-M)</text>
  <rect x="190" y="42" width="110" height="12" fill="#fff" stroke="#1d4e89"/><text x="245" y="50" text-anchor="middle" font-size="6">Local Index: { Red: [Apple] }</text>
  
  <rect x="180" y="80" width="130" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="245" y="95" text-anchor="middle" font-weight="bold">Partition 2 (N-Z)</text>
  <rect x="190" y="102" width="110" height="12" fill="#fff" stroke="#1d4e89"/><text x="245" y="110" text-anchor="middle" font-size="6">Local Index: { Red: [Strawberry] }</text>
  
  <path d="M90 60 L180 40" stroke="#1a1a1a" fill="none"/><path d="M180 40 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 180 40)"/>
  <path d="M90 70 L180 100" stroke="#1a1a1a" fill="none"/><path d="M180 100 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 100)"/>
  
  <text x="330" y="60" font-weight="bold">Scatter / Gather</text>
  <text x="330" y="72" font-size="7">The router queries ALL nodes,</text>
  <text x="330" y="82" font-size="7">waits for them to finish,</text>
  <text x="330" y="92" font-size="7">and merges the results.</text>
</svg>

- Writes stay local: the row and its index entry are on the same node, updated in the same operation, so the index can be strongly consistent. DynamoDB's LSI is exactly this: it shares the table's partition key, and reads from it may be strongly consistent
- Reads by index value alone must ask every partition, because red items exist in all of them: a **scatter-gather**. DynamoDB sidesteps it by rule: an LSI query must supply the partition key, so it only ever reads one item collection

### The failure

- Scatter-gather at scale. Each query costs every partition, so adding nodes adds no read capacity for it. And the query's latency is the slowest partition's, every time: across 100 partitions the chance that one is mid-pause is high (booklet 01's tail-latency arithmetic), so p99 gets worse with every node added
