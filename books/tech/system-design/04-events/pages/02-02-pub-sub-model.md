## The pub/sub model

- The Queue model is point-to-point (one message goes to one consumer). But what if you want to implement Fan-out, where multiple independent services all get a copy of the same message?
- You need the **Publish/Subscribe (Pub/Sub) Model**. Instead of writing directly to a queue, the producer writes to a Topic (or an Exchange). The broker then copies that message to every authorized Subscription (or binding) attached to that Topic

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

- Under the hood, a Pub/Sub model is almost always implemented by linking a Topic to multiple Queues. Each Consumer team gets their own Queue. This allows them to process messages at their own rate without affecting the other teams
- **Examples:** Amazon SNS (often wired directly into SQS), Google Cloud Pub/Sub, RabbitMQ (using Fanout Exchanges bound to Queues)

### The failure

- A subscription nobody reads fills the broker. Because the Producer has no idea who is subscribed, it just keeps publishing. If the Analytics team provisions a Queue, attaches it to the Topic, and then accidentally turns off their Consumer app, the Queue will quietly absorb a copy of every single message on the system. It will grow infinitely until the broker runs out of disk space and crashes
