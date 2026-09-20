## Producer-side reordering

- Even if you use a key and a partition perfectly, you can still ruin ordering right at the source: the Producer. 
- If your Producer sends `Event A` over the network, and the TCP connection drops, the Producer will retry. But what if it had already sent `Event B` in the meantime, and `Event B` succeeded? `Event A` is retried and lands *after* `Event B` in the log

```typescript
// Kafka Producer Configuration
const producer = kafka.producer({
  // How many un-acked requests can be in flight simultaneously
  maxInFlightRequests: 5,
  
  // MUST be true to prevent reordering on retries!
  idempotent: true 
});
```

- To prevent this, Kafka introduced the **Idempotent Producer** (on by default in modern clients). It attaches a sequence number to every message. If the broker receives `Event B` (sequence 2) while `Event A` (sequence 1) is missing, it knows `Event A` failed and will hold `Event B` until `Event A` arrives

### The failure

- Turning idempotence off "for performance" reintroduces reordering. Before Kafka 0.11, the only way to guarantee order was to set `maxInFlightRequests = 1`. This crippled throughput because the producer had to wait for the broker to ack every single batch before sending the next. Developers reading outdated blog posts sometimes turn off `idempotence` and leave `maxInFlight = 5` to "speed things up". They immediately reintroduce silent producer-side reordering on every network blip
