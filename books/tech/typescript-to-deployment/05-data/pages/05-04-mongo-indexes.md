## Indexes in MongoDB

- The same B-tree idea as PostgreSQL, with the same rules about column order
- The difference is that a missing index is easier to miss, because nothing fails. The query just reads the whole collection

```js
db.orders.createIndex({ sellerId: 1, createdAt: -1 })
db.orders.createIndex({ awb: 1 }, { unique: true, sparse: true })
db.orders.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 })
```

- `1` is ascending, `-1` descending. It matters for sorts, not for equality
- `sparse` skips documents missing the field, so a unique index tolerates many documents with no `awb`
- `expireAfterSeconds` creates a **TTL index**, and MongoDB deletes those documents automatically. Ideal for sessions and audit logs

### Checking whether it is used

```js
db.orders.find({ sellerId: "s1" }).explain("executionStats")
```

- `COLLSCAN` in the winning plan means no index was used
- `IXSCAN` means one was
- Compare `totalDocsExamined` against `nReturned`. Examining fifty thousand to return twenty is the same problem as a bad Postgres plan

### The ESR rule

- Order compound index keys as **Equality, Sort, Range**
- Getting it wrong means MongoDB uses the index for the match and then sorts in memory, which fails outright past 32 megabytes
