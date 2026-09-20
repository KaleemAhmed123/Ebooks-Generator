## At-most-once

- Every asynchronous messaging system forces you to choose how it should behave when things go wrong. These are called Delivery Semantics
- **At-most-once** delivery means exactly what it says: a message will be delivered zero times or one time. It will *never* be delivered twice. If a crash occurs, the message is permanently lost

<svg viewBox="0 0 460 140" role="img" aria-label="At-most-once timeline. Consumer reads message. Consumer immediately commits offset. Consumer begins processing. Consumer crashes. Message is lost." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L400 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="43" text-anchor="middle" font-weight="bold">Broker</text>
  
  <rect x="100" y="20" width="40" height="40" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="120" y="43" text-anchor="middle" font-size="6">Msg 1</text>
  
  <path d="M50 100 L250 100" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="103" text-anchor="middle" font-weight="bold">Consumer</text>
  
  <path d="M120 40 L120 100" stroke="#1d4e89" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="140" y="70" text-anchor="middle" font-size="6" fill="#1d4e89">Pull</text>
  
  <path d="M160 100 L160 40" stroke="#b8541a" fill="none" stroke-width="1"/>
  <path d="M160 40 l-3 6 h6 z" fill="#b8541a"/>
  <text x="200" y="70" text-anchor="middle" font-weight="bold" fill="#b8541a">Ack (Commit)</text>
  
  <rect x="180" y="100" width="70" height="15" fill="#fce4e2"/>
  <text x="215" y="110" text-anchor="middle" font-size="6">Processing...</text>
  
  <circle cx="250" cy="100" r="4" fill="#b8541a"/>
  <text x="250" y="125" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">CRASH</text>
  <text x="250" y="135" text-anchor="middle" font-size="6" fill="#b8541a">Message is gone forever.</text>
</svg>

- At-most-once is achieved in two ways:
  1. The Producer uses `acks=0` (fire and forget).
  2. The Consumer commits the offset *before* it starts processing the data.

### The failure

- Committing an offset before a database write. If you configure Kafka with `enable.auto.commit = true`, a background thread will blindly commit your offset every 5 seconds. If that timer fires while your application is halfway through a slow database write, and the pod is killed for exceeding memory limits, the data is gone. When the pod restarts, it resumes from the committed offset, completely skipping the message that was being processed. Unless you are building a metrics dashboard where losing a single data point doesn't matter, never use at-most-once
