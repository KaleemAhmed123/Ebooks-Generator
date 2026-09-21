## Poison messages

- A **poison message** fails every time it is delivered: malformed payload, a field the handler does not expect, a bug that its shape triggers. At-least-once delivery does what it promises and delivers it again

<svg viewBox="0 0 460 140" role="img" aria-label="Poison message blocking a queue. A red skull message is at the front of the partition. 10,000 valid messages are backed up behind it. The consumer repeatedly crashes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="250" height="40" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="145" y="45" text-anchor="middle" font-weight="bold">Partition 0</text>
  
  <rect x="30" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="55" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="80" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="73" text-anchor="middle" font-size="6">... 10,000 valid messages</text>
  
  <rect x="180" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="205" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="230" y="55" width="30" height="30" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  
  <circle cx="245" cy="70" r="5" fill="#b8541a"/>
  <text x="245" y="73" text-anchor="middle" font-size="6" font-weight="bold" fill="#ffffff">X</text>
  
  <path d="M270 70 L340 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="305" y="65" text-anchor="middle" font-size="6">Polls Poison</text>
  
  <rect x="340" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="74" text-anchor="middle" font-weight="bold">Consumer</text>
  
  <path d="M380 90 L380 120" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="380" y="130" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">CRASH &amp; REBOOT</text>
  
  <path d="M360 120 C 320 120 290 100 290 80" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <path d="M290 80 l-3 6 h6 z" fill="#b8541a"/>
  <text x="325" y="110" text-anchor="middle" font-size="6" fill="#b8541a">Infinite Retry Loop</text>
</svg>

- The cure is a count. Deliver, fail, count; past a limit, stop delivering and put it somewhere else (page 3). Brokers differ in who counts
  - **RabbitMQ quorum queues** count for you: each redelivery carries an `x-delivery-count` header, and since 4.0 the queue's delivery limit defaults to 20. Past it the message is dropped, or dead-lettered if the queue has a dead-letter exchange
  - **Kafka share groups** (Module 3, page 8) count delivery attempts per record and let the consumer reject a record outright
  - **A Kafka consumer group** has no count. The consumer keeps its own, in a header it adds when it republishes to a retry topic (page 1), or in a store keyed by topic, partition and offset
- The limit is small on purpose. Twenty attempts of a record that fails in a millisecond is twenty milliseconds; twenty attempts of one that times out at thirty seconds is ten minutes of a blocked lane

### The failure

- Requeue with no counter. `nack(msg, false, true)` on every error puts the message back, the same consumer takes it again, and the loop runs at the speed of the failure. On a classic RabbitMQ queue with no delivery limit and on a Kafka partition this is forever, and the symptom is a consumer at 100% CPU with zero throughput
