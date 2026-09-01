## Staying up, and reading more

### Multi-AZ

- A **standby** in another availability zone receives every write synchronously and is promoted automatically if the primary fails
- Failover takes about a minute, and the endpoint name does not change, so applications reconnect on their own
- **The standby serves no traffic.** It doubles the cost and buys availability, not performance
- **This is not a backup.** A dropped table replicates to the standby instantly

### Read replicas

```bash
aws rds create-db-instance-read-replica \
  --db-instance-identifier orders-replica-1 \
  --source-db-instance-identifier orders-prod
```

- Replicas are **asynchronous**, so they lag, usually by milliseconds and occasionally by much more under load
- **Never read your own write from a replica.** Create an order, redirect, read from the replica, and the order is not there yet
- Route reports, exports and analytics there. Keep anything a user just wrote on the primary

```ts
const write = new PrismaClient({ datasources: { db: { url: env.DATABASE_URL } } })
const read  = new PrismaClient({ datasources: { db: { url: env.DATABASE_REPLICA_URL } } })
```
