## Partitioning and sharding

- Replicas multiply read capacity. They do nothing for write capacity or for a table that has grown too large to manage
- Two different answers, and they are often confused
- **Partitioning** splits one table into pieces inside one database. The application still sees one table
- **Sharding** splits the data across separate databases. The application, or a router, has to know which one holds what

### Partitioning

```sql
CREATE TABLE orders (id TEXT, created_at TIMESTAMPTZ NOT NULL, ...)
  PARTITION BY RANGE (created_at);

CREATE TABLE orders_2026_08 PARTITION OF orders
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
```

- Queries filtered by date touch one partition instead of the whole table, which is **partition pruning**
- Dropping last year's data becomes `DROP TABLE` on a partition rather than a `DELETE` of 40 million rows
- The catch is that a query without the partition key scans every partition, so the key has to match how you query

### Sharding

- The last resort. It removes cross-shard joins, cross-shard transactions and global unique constraints
- The **shard key** decides everything and is painful to change afterwards. Pick one that spreads evenly and appears in most queries
- MongoDB automates the mechanics and version 9 made resharding near-instant, which removes the worst part

### Do the cheap things first

- Indexes, then partitioning, then read replicas, then a bigger machine
- Most services never need sharding, and the ones that adopt it early regret it
