## Replication and read replicas

- One database server is a single point of failure and a single ceiling on read capacity
- **Replication** keeps one or more copies continuously updated from a primary
- The primary takes every write. Replicas take reads, and can be promoted if the primary dies
- PostgreSQL calls it streaming replication. MongoDB calls the group a **replica set** and elects a new primary automatically

### Replication lag is the thing to design around

- A replica is always slightly behind, usually milliseconds, occasionally seconds under load
- So a user who just placed an order can read a replica and not see it, which looks like the write was lost
- **Read your own writes from the primary.** Route a user to the primary for a short window after they write
- Send only genuinely stale-tolerant reads to a replica: reports, search, listings, analytics

### MongoDB read preferences

```js
db.orders.find({ sellerId }).readPref("secondaryPreferred")
```

| Preference | Reads from |
|---|---|
| `primary` | the primary only. The default, and correct for anything current |
| `primaryPreferred` | primary, falling back to a secondary |
| `secondary` | secondaries only |
| `secondaryPreferred` | secondaries, falling back to the primary |

### Write concern and durability

- `w: 1` acknowledges once the primary has it. Fast, and a failover can lose it
- `w: "majority"` waits until most of the set has it. Slower, and it survives a failover
- Money uses `majority`. A view counter does not
