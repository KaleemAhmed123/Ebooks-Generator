## Ordering is per partition

- Kafka's guarantee, in its own words: any consumer of a partition reads that partition's events in exactly the order they were written. Nothing is said about two partitions, and nothing can be: they are separate files read by separate consumers at separate speeds

<svg viewBox="0 0 460 140" role="img" aria-label="Ordering is per partition. Two events with different keys land on different partitions and are consumed out of order." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="60" text-anchor="middle" font-weight="bold">Producer</text>
  <text x="60" y="75" text-anchor="middle" font-size="6">1. Create (key: A)</text>
  <text x="60" y="85" text-anchor="middle" font-size="6">2. Update (key: B)</text>
  
  <rect x="180" y="20" width="100" height="25" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="36" text-anchor="middle" font-weight="bold">Partition 0</text>
  <rect x="190" y="25" width="15" height="15" fill="#1d4e89"/>
  <text x="197" y="36" text-anchor="middle" font-weight="bold" fill="#ffffff">A</text>
  
  <rect x="180" y="90" width="100" height="25" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="106" text-anchor="middle" font-weight="bold">Partition 1</text>
  <rect x="260" y="95" width="15" height="15" fill="#1d4e89"/>
  <text x="267" y="106" text-anchor="middle" font-weight="bold" fill="#ffffff">B</text>
  
  <rect x="360" y="40" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="60" text-anchor="middle" font-weight="bold">Consumer</text>
  <text x="400" y="75" text-anchor="middle" font-size="6" fill="#b8541a">1. Update (key: B)</text>
  <text x="400" y="85" text-anchor="middle" font-size="6" fill="#b8541a">2. Create (key: A)</text>
  
  <path d="M100 65 L180 32" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 32 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-20 180 32)"/>
  <path d="M100 75 L180 102" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 102 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(20 180 102)"/>
  
  <path d="M280 32 L360 65" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M360 65 l-6 -3 v5 z" fill="#1d4e89" transform="rotate(20 360 65)"/>
  <path d="M280 102 L360 75" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M360 75 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-20 360 75)"/>
</svg>

| Broker | The lane | What a stuck message does |
|---|---|---|
| Kafka | key → partition | blocks the whole partition, every key on it (Module 6, page 1) |
| SQS FIFO | `MessageGroupId` | blocks that group only; other groups flow |
| Google Pub/Sub | ordering key, capped at 1 MBps of publishing per key | redelivers that key's later messages too |

:::interview
"How do you guarantee ordering?" — Per key, not globally. Put every event about one entity under one key, so it lands on one partition and is read by one consumer in write order. Then the three places it still breaks: a second key for one entity, a partition count change (page 4), producer retries without idempotence (page 5).
:::

### The failure

- Two keys for one entity. `OrderCreated` keyed by `orderId` lands on partition 0; `PaymentReceived` for the same order keyed by `paymentId` lands on partition 7. Partition 7 is quiet, so its consumer is ahead, and the payment is applied to an order that does not exist yet. Produced in order; keyed out of it
