## Key to partition

- The producer picks the partition. With a **key**, the default partitioner hashes it and takes the result modulo the partition count, so equal keys always land on the same partition. With no key, it fills a batch for one partition, then moves to another: even spread, no ordering between records

```typescript
await producer.send({
  topic: "orders",
  messages: events.map((e) => ({
    key: e.orderId,             // every event about O-123 shares a partition
    value: JSON.stringify(e),
  })),
});
```

- The key is a routing decision, not data. It is the answer to "which events must stay in order with each other?", and it should be the id of that thing: the order, the account, the device
- The key is also the spread. Its values are hashed across the partitions, so a key with a few distinct values fills a few partitions and leaves the rest empty

### The failure

- A low-cardinality key. `tenantId` in a system with 500 small tenants and one that produces 90% of the traffic puts 90% of the traffic on one partition and one consumer, whatever the partition count. Choose the key by ordering need and check its distribution; booklet 02's hot-partition pages are the same problem on a database
