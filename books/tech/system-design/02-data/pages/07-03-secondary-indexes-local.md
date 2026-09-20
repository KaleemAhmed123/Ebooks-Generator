## Local secondary indexes

- A secondary index allows you to query by a column other than the primary key. In a partitioned database, the index must also be partitioned. There are two ways to do this: local and global
- In a **local secondary index (LSI)** (or document-partitioned index), each partition maintains its own completely independent index covering only the data stored on that physical node

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

- **The benefit**: Writes are extremely fast. When you insert a document into Partition 1, the database updates the local index on the exact same node. DynamoDB LSIs share the partition key and provide strongly consistent reads
- **The drawback**: Reads are terribly inefficient. Because the index is local, the router does not know which partition holds the red items. It must execute a **scatter-gather**: send the query to every single partition in the cluster, wait for them all to reply, and combine the results

### The failure

- Scaling a cluster that relies heavily on scatter-gather queries. Because a scatter-gather query hits every node, adding more nodes to the cluster does not increase read throughput
- Worse, scatter-gather latency is dictated by the slowest node (tail latency). If you query 100 partitions, and one of them is experiencing a garbage collection pause, the entire query blocks. The more nodes you add, the higher the probability that one of them is slow
