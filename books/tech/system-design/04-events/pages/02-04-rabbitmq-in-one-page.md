## RabbitMQ in one page

- RabbitMQ is a queue broker with a routing layer in front. A producer never writes to a queue; it writes to an **exchange**, and **bindings** decide which queues get a copy

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

| Exchange type | Routes on | Gives you |
|---|---|---|
| direct | exact routing key | a queue per job type |
| fanout | nothing; every bound queue gets a copy | pub/sub (page 2) |
| topic | wildcard pattern such as `order.*.placed` | subscriptions by pattern |

- Consumers **ack** when done, or **nack** to reject; a rejected message can be requeued or dead-lettered (Module 6). An unacked delivery on a channel that closes is requeued and redelivered with `redelivered=true`
- Replicated queues are **quorum queues**: each is a Raft group (booklet 03), so a message is confirmed once a majority of replicas have it. They also count deliveries per message, which is what stops a poison message looping (Module 6, page 2)

### The failure

- Auto-ack. With automatic acknowledgement the broker treats a message as done the moment it is written to the socket. A consumer that crashes parsing it has lost it; nothing is requeued. RabbitMQ's own docs call the mode unsafe. Manual ack, sent after the effect is committed, is the default worth having
