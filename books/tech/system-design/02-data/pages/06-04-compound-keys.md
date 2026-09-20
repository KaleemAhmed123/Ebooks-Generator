## Compound keys

- We want the even write distribution of hash partitioning, but we also want the fast range scans of range partitioning. We can have both by using a compound key
- A compound key splits the identity into two parts: a **partition key** and a **sort key** (or clustering column)

<svg viewBox="0 0 460 140" role="img" aria-label="Compound keys in DynamoDB. The Partition Key (UserId) is hashed to pick the node. Inside that node, the Sort Key (Timestamp) is kept physically sorted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="67" text-anchor="middle" font-weight="bold">Compound Key</text>
  <text x="70" y="82" text-anchor="middle" font-size="7">UserId, Timestamp</text>
  
  <rect x="250" y="20" width="150" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="325" y="40" text-anchor="middle">Node 3 (Hash 3B)</text>
  
  <rect x="270" y="55" width="110" height="16" fill="#fff" stroke="#6b6b6b"/><text x="325" y="66" text-anchor="middle" font-family="monospace" font-size="7">User_123, 10:00:00</text>
  <rect x="270" y="71" width="110" height="16" fill="#fff" stroke="#6b6b6b"/><text x="325" y="82" text-anchor="middle" font-family="monospace" font-size="7">User_123, 10:05:00</text>
  <rect x="270" y="87" width="110" height="16" fill="#fff" stroke="#6b6b6b"/><text x="325" y="98" text-anchor="middle" font-family="monospace" font-size="7">User_123, 10:10:00</text>
  
  <path d="M120 70 L250 70" stroke="#1a1a1a" fill="none"/><path d="M250 70 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="185" y="65" text-anchor="middle" font-size="7" font-weight="bold">1. Hash(UserId)</text>
  <text x="185" y="85" text-anchor="middle" font-size="7" fill="#6b6b6b">Finds the node</text>
  
  <text x="390" y="80" font-weight="bold" fill="#1d4e89" font-size="7">2. Sorted</text>
</svg>

- **How it works**: The database runs the hash function *only* on the partition key (`UserId`). This determines which node holds the data. Once the data lands on that node, it is stored sequentially, ordered by the sort key (`Timestamp`)
- This allows you to perform an efficient range query (`Timestamp BETWEEN X AND Y`) as long as you provide the exact `UserId`. DynamoDB and Cassandra both use this design pattern heavily. An entire subset of data sharing a partition key is called an "item collection"

### The failure

- An item collection that grows forever. Because all rows with the same partition key must live on the same physical node, the collection is bound by the storage capacity of one machine
- In DynamoDB, if a table has a Local Secondary Index (LSI), any single item collection (one partition-key value) is strictly capped at 10 GB. If one user generates 11 GB of events, writes to that user will permanently fail
