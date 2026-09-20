## RabbitMQ in one page

- RabbitMQ is the quintessential Queue/Pub-Sub hybrid. To understand RabbitMQ, you just need to understand its routing model

<svg viewBox="0 0 460 140" role="img" aria-label="RabbitMQ model. A producer publishes to an Exchange. Bindings route the message to Queue A and Queue B based on routing keys." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Producer</text>
  
  <circle cx="160" cy="70" r="30" fill="#fcfcfc" stroke="#b8541a" stroke-width="2"/>
  <text x="160" y="65" text-anchor="middle" font-weight="bold" fill="#b8541a">Exchange</text>
  <text x="160" y="75" text-anchor="middle" font-size="6" fill="#b8541a">Type: Direct</text>
  
  <rect x="300" y="20" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="330" y="44" text-anchor="middle" font-weight="bold">Queue A</text>
  
  <rect x="300" y="80" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="330" y="104" text-anchor="middle" font-weight="bold">Queue B</text>
  
  <path d="M80 70 L130 70" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M130 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M185 55 L300 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M300 40 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-10 300 40)"/>
  <text x="245" y="40" text-anchor="middle" font-size="6" font-weight="bold" fill="#1d4e89">Binding key: "pdf"</text>
  
  <path d="M185 85 L300 100" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M300 100 l-6 -3 v5 z" fill="#1d4e89" transform="rotate(10 300 100)"/>
  <text x="245" y="105" text-anchor="middle" font-size="6" font-weight="bold" fill="#1d4e89">Binding key: "email"</text>
</svg>

- **Exchange:** Producers never send messages directly to a queue. They send them to an Exchange.
- **Bindings:** You configure rules (Bindings) telling the Exchange where to route the message. A `Direct` exchange routes based on an exact routing key. A `Fanout` exchange blindly copies the message to every bound queue. A `Topic` exchange routes on wildcard patterns (e.g. `user.*.created`).
- **Quorum Queues:** Historically, RabbitMQ was known for losing data during network partitions. In modern RabbitMQ, you should use Quorum Queues, which are backed by the Raft consensus algorithm for high availability.

### The failure

- Auto-ack is at-most-once, and the docs call it unsafe. Many client libraries default to "auto-ack" mode, where the broker deletes the message the millisecond it is sent over the TCP socket. If the consumer crashes while parsing the JSON, the message is permanently lost. You must always use manual acks, sending the ack only *after* your database transaction commits
