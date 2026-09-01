## Connections

- **Postgres uses one process per connection.** A `db.m7g.large` allows a few hundred, and each one costs memory before it does any work
- Ten application instances with a pool of twenty each is two hundred connections. Add a queue worker fleet and the database runs out
- **`too many connections` under load is one of the most common production database failures**, and it is a configuration problem rather than a capacity one

### Size the pool from the database backwards

```text
pool size per instance = (max_connections * 0.8) / (instances + workers)
```

```ts
// Prisma
DATABASE_URL="postgres://...?connection_limit=10&pool_timeout=20"

// node-postgres
new Pool({ max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000 })
```

- **A bigger pool is not faster.** Beyond the number of cores the database has, added connections only add contention
