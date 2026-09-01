# Module 9 - Recent wins

## What changed lately in the data layer

### PostgreSQL 18

- **Asynchronous I/O**, showing up to three times faster reads from storage. The largest single performance change in years
- **`uuidv7()` built in.** Time-ordered UUIDs, so a random primary key stops scattering inserts across the whole index

```sql
CREATE TABLE orders (id UUID PRIMARY KEY DEFAULT uuidv7());
```

- **Virtual generated columns**, computed on read rather than stored, and now the default for generated columns
- **Temporal constraints**, so a primary key or foreign key can cover a range of time, which makes non-overlapping bookings a database rule
- **OAuth authentication**, so connections can use a token rather than a stored password
- Logical replication now handles schema changes, which was the long-standing gap for zero-downtime upgrades

### MongoDB 9

- **`autoEmbed`**, generating vector embeddings inside the database, removing the separate embedding pipeline for retrieval
- **Near-instant resharding**, so data redistributes onto new servers without downtime or manual planning
- Roughly **54 percent faster bulk writes**

### Worth adopting first

- `uuidv7()` if you are on Postgres 18 and using random primary keys. It costs one line and removes a real write-amplification problem
- Partial indexes on queue and outbox tables, which most schemas still lack
