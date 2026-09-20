## Producer batching and linger

- Sending one HTTP request for every single event is terribly inefficient. Network overhead dominates the CPU. To achieve millions of messages per second, producers must batch records
- Instead of sending instantly, the producer groups records bound for the same partition into a single network request. You configure this trade-off between latency and throughput

```typescript
// Optimizing a Kafka Producer for throughput
const producer = kafka.producer({
  // How long to wait before sending a batch (default is usually 0)
  lingerMs: 20,
  
  // The maximum size of a batch in bytes
  batchSize: 1024 * 1024, // 1 MB
  
  // Safest durability
  acks: -1 // equivalent to 'all'
});

// The application calls 'send' 10,000 times. 
// Under the hood, the producer waits 20ms and fires ONE network request
for (let i = 0; i < 10000; i++) {
  producer.send({
    topic: 'page-clicks',
    messages: [{ key: 'user1', value: 'click' }]
  });
}
```

- By setting `lingerMs: 20`, you instruct the producer to intentionally wait 20 milliseconds before sending data over the network, allowing time for more records to accumulate in the buffer. You trade 20ms of latency for a massive increase in throughput

### The failure

- `lingerMs=0` floods the broker with tiny requests. If you have a high-volume application and you leave `linger.ms` at 0 (the default in many Kafka clients), the producer will attempt to send a network request for almost every single message. Your broker's CPU will max out handling network interrupts, and your throughput will crawl to a halt
