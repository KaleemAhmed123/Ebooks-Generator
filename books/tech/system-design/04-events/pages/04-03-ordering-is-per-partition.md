## Ordering is per partition

- Message brokers do not guarantee global ordering across the entire system. In Kafka, **ordering is only guaranteed strictly within a single partition**
- If you write three events with the key `O-123`, they are hashed to Partition 4. Because Partition 4 is an append-only file, the events are written in exactly the order they arrived. Because Partition 4 is read by exactly one consumer, that consumer reads them in exactly the same order

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

- If you don't assign a key, or if you assign the wrong key, your events will be scattered across partitions and will be consumed entirely out of order.

### The failure

- Different keys for the same entity arrive swapped. A developer writes an `OrderCreated` event and keys it by `orderId` (e.g. `O-123`). Five seconds later, the user pays, and the developer writes a `PaymentSuccess` event. But this time, they accidentally key it by `paymentId` (e.g. `P-999`). The `O-123` hash lands on Partition 0. The `P-999` hash lands on Partition 7. Partition 7 happens to be empty, so the consumer reads it instantly. The consumer receives the `PaymentSuccess` event *before* the `OrderCreated` event, crashes with a Foreign Key error, and brings down the pipeline
