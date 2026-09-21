## The pub/sub model

- A queue is point to point. Fan-out (Module 1, page 3) needs one message copied to many readers. In the **publish/subscribe** model the producer writes to a **topic** (RabbitMQ calls it an exchange), and the broker copies each message into every **subscription** attached to it

<svg viewBox="0 0 460 140" role="img" aria-label="The pub/sub model. A Producer publishes to a Topic. The broker copies the message into a Billing Queue and a Warehouse Queue." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Producer</text>
  
  <rect x="130" y="20" width="160" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="160" y="74" text-anchor="middle" font-weight="bold" fill="#b8541a">Topic</text>
  
  <path d="M190 70 L220 40" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M220 40 l-6 0 v5 z" fill="#b8541a" transform="rotate(-45 220 40)"/>
  <path d="M190 70 L220 100" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M220 100 l-6 -4 v5 z" fill="#b8541a" transform="rotate(45 220 100)"/>
  
  <rect x="230" y="30" width="40" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="250" y="44" text-anchor="middle" font-size="6">Queue 1</text>
  
  <rect x="230" y="90" width="40" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="250" y="104" text-anchor="middle" font-size="6">Queue 2</text>
  
  <rect x="350" y="20" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="390" y="39" text-anchor="middle" font-weight="bold">Billing</text>
  
  <rect x="350" y="80" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="390" y="99" text-anchor="middle" font-weight="bold">Warehouse</text>
  
  <path d="M80 70 L130 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M270 40 L350 40" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M350 40 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M270 100 L350 100" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M350 100 l-6 -3 v6 z" fill="#1a1a1a"/>
</svg>

- Each subscription is, underneath, a queue of its own. Billing's queue and the warehouse's queue hold their own copies, drain at their own rates, and neither sees the other's acks. SNS feeding SQS queues and a RabbitMQ fanout exchange bound to several queues are the same shape
- The producer's contract is with the topic. It does not know how many subscriptions exist, and it should not: that ignorance is the decoupling
- A subscription can filter: routing keys and patterns decide which copies a queue receives (page 4)

### The failure

- A subscription nobody reads fills the broker. Analytics binds a queue, runs a consumer for a week, then stops the consumer and forgets the binding. The queue keeps receiving a copy of everything. Producers see nothing wrong until the broker's disk is full. Every subscription is a consumer someone must own, or delete
