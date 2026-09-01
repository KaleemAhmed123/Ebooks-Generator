### Cluster mode

- **Cluster mode disabled** is one primary with replicas. Simple, and the whole dataset must fit one node
- **Cluster mode enabled** shards across nodes. Necessary at scale, and it breaks multi-key operations and Lua scripts that span slots
- **BullMQ and most libraries assume cluster mode disabled.** Check before enabling it

### Watching it

- `DatabaseMemoryUsagePercentage`, `Evictions`, `CurrConnections`, `CacheHitRate`
- **Evictions rising on a queue node is data being lost right now**
