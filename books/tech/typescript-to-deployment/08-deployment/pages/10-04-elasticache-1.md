## ElastiCache

- **ElastiCache is managed Redis or Valkey.** Same protocol, same clients, same commands as Booklet 5, with the operations handled
- It is used for four distinct things, and knowing which one you are doing decides how you configure it

| Use | Losing the data means |
|---|---|
| **cache** | a slow request. Acceptable |
| **sessions** | everyone is logged out. Painful |
| **rate limiting** | limits reset. Acceptable |
| **job queue** (BullMQ) | **lost jobs.** Not acceptable |

```bash
aws elasticache create-replication-group \
  --replication-group-id orders-cache \
  --replication-group-description 'orders cache' \
  --engine valkey --cache-node-type cache.m7g.large \
  --num-node-groups 1 --replicas-per-node-group 1 \
  --automatic-failover-enabled --multi-az-enabled \
  --transit-encryption-enabled --at-rest-encryption-enabled \
  --cache-subnet-group-name private-data --security-group-ids sg-cache
```

### The settings that decide behavior

- **`maxmemory-policy`.** `allkeys-lru` evicts anything when full, which is right for a cache and **catastrophic for a job queue**
- For queues and sessions, use `noeviction` and monitor memory, so the failure is a visible error rather than silent data loss
- **Enable transit encryption.** Redis speaks plain text by default and the traffic includes session tokens
