## Producer-side reordering

- The key can be right and the order still wrong at the source. The producer sends batch A, then batch B, on the same connection; A fails and is retried; B has already been written. The log now reads B, A

```typescript
const producer = {
  "enable.idempotence": true,                    // default
  "max.in.flight.requests.per.connection": 5,    // default; order kept up to 5 with idempotence
  "retries": 2147483647,                         // default; bounded by delivery.timeout.ms
  "delivery.timeout.ms": 120000,                 // default: give up after two minutes
};
```

- The **idempotent producer** fixes it. The broker gives the producer an id, and every batch carries a per-partition sequence number; the broker accepts only the next expected sequence for that producer and partition. A retried batch A cannot be written after B, and a duplicate of A is dropped. Kafka's docs: ordering is preserved with up to five requests in flight when idempotence is on
- Before idempotence the only ordered configuration was one request in flight, which halved throughput on every round trip. That is the setting old advice still repeats
- Module 5, page 3 is the deduplication side of the same mechanism, and its limit

### The failure

- Idempotence off "for performance", in-flight left at 5. Every network blip is now a chance to reorder, silently, on a keyed topic that the consumers trust to be ordered. The performance gained is close to nothing; Confluent's own measurement puts the idempotent producer's cost at about 3% of throughput
