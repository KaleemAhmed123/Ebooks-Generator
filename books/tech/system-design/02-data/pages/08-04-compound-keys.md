## Compound keys

- Hash for spread, range for scans: a **compound key** gives both by splitting the key in two. The **partition key** is hashed to pick the partition; the **sort key** (Cassandra: clustering columns) orders the rows inside it

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

- `(user_id, timestamp)`: the hash of `user_id` picks the node; on that node the user's rows are stored in timestamp order. `timestamp BETWEEN x AND y` is one sorted run, as long as the query names the `user_id`
- DynamoDB calls the rows that share a partition key an **item collection**. Cassandra calls it a partition. Either way it is the unit that must fit on one node

### The failure

- A collection that grows without bound. Everything under one partition key lives on one node, so one busy user, one large tenant, is one node's disk
- DynamoDB makes the limit explicit when a table has a local secondary index: an item collection is capped at 10 GB, and writes past it are rejected. Cassandra's "not too big nor too small" (Module 1, page 4) is the same limit stated softly. Bound the collection: add a period to the partition key, `(user_id, month)`
