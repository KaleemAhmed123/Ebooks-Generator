## Batching and `linger.ms`

- One network request per record is the slowest way to use a log. The producer groups records bound for the same partition into a batch and sends the batch in one request. Two settings shape it

```typescript
// Kafka producer properties (names are Kafka's; every client passes them through)
const producer = {
  "acks": "all",           // default: wait for every in-sync replica (page 1)
  "linger.ms": 20,         // wait up to 20 ms for a batch to fill before sending
  "batch.size": 262144,    // bytes per partition batch; a full batch sends at once
  "compression.type": "lz4", // compress the whole batch, not each record
};
```

- `linger.ms` is a latency you pay on purpose. With it at 0 the producer sends as soon as a sender thread is free, so at low volume every record travels alone. Twenty milliseconds of waiting lets thousands of records share one request and one disk write on the broker
- `batch.size` is the other trigger: a batch that reaches it sends without waiting for the linger. Neither setting delays a record that is alone on a quiet topic by more than the linger
- Compression applies to the batch, so it pays off only when batches are large. Small batches, no linger, compression on: the CPU cost with little of the saving

### The failure

- `linger.ms=0` at volume. A service emitting 50,000 events per second sends close to 50,000 requests per second to the partition leaders. The broker spends its time in request handling, not in writing; producer latency climbs; the fix is to wait longer, which nobody expects to be the answer
