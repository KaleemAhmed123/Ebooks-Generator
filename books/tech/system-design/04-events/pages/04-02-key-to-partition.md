## Key to partition

- If a Topic has 10 partitions, how does the Producer decide which partition to write a message to? It relies on the **Routing Key**
- If you do not provide a key, the producer will usually default to "sticky partitioning", where it picks a random partition and sticks with it for the duration of a batch, then picks a new random one for the next batch. This evenly distributes load, but destroys any ordering guarantees
- If you *do* provide a key, the producer uses a hashing algorithm: `hash(key) % total_partitions`. This guarantees that every message with the same key always lands on the exact same partition

```typescript
// Choosing a key for ordering
const events = [
  { event: 'OrderCreated', orderId: 'O-123', userId: 'U-99' },
  { event: 'PaymentSuccess', orderId: 'O-123', userId: 'U-99' }
];

// Send to Kafka
await producer.send({
  topic: 'orders',
  messages: events.map(e => ({
    // IMPORTANT: The key guarantees both events go to the same partition
    key: e.orderId, 
    value: JSON.stringify(e)
  }))
});
```

### The failure

- Low-cardinality keys make a hot partition. A common mistake in multi-tenant SaaS is using the `tenantId` as the routing key. If you have 500 small tenants and 1 massive enterprise tenant (who generates 90% of your traffic), the hashing algorithm will map that massive tenant to a single partition. That partition will receive 90% of your traffic, overloading the broker it lives on and the single consumer assigned to read it. The other 49 consumers will be mostly idle. You must choose a high-cardinality key (like `userId` or `orderId`)
