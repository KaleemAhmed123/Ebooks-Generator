## Push vs pull

- How do messages actually get from the broker to the consumer? There are two models: **Push** and **Pull**

<svg viewBox="0 0 460 140" role="img" aria-label="Push vs Pull. In Push, the Broker sends data to the Queue Consumer, regulated by a Prefetch brake. In Pull, the Log Consumer requests data via Long Poll." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="45" text-anchor="middle" font-weight="bold">Broker</text>
  
  <rect x="20" y="80" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="105" text-anchor="middle" font-weight="bold">Broker</text>
  
  <rect x="360" y="20" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="400" y="39" text-anchor="middle" font-weight="bold">Queue Consumer</text>
  <text x="400" y="50" text-anchor="middle" font-size="6">Prefetch limit = 100</text>
  
  <rect x="360" y="80" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="400" y="99" text-anchor="middle" font-weight="bold">Log Consumer</text>
  <text x="400" y="110" text-anchor="middle" font-size="6">Long poll (pull)</text>
  
  <path d="M100 30 L360 30" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M360 30 l-6 -3 v6 z" fill="#b8541a"/>
  <text x="230" y="25" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">PUSH</text>
  
  <path d="M360 50 L100 50" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M100 50 l6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="60" text-anchor="middle" font-size="6">"Stop pushing, I have 100 un-acked"</text>
  
  <path d="M360 90 L100 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M100 90 l6 -3 v6 z" fill="#1d4e89"/>
  <text x="230" y="85" text-anchor="middle" font-size="6" font-weight="bold" fill="#1d4e89">PULL REQUEST</text>
  
  <path d="M100 110 L360 110" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M360 110 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="120" text-anchor="middle" font-size="6">Response with batch</text>
</svg>

- **Push (RabbitMQ):** The broker establishes a connection and aggressively pushes messages to the consumer as fast as possible. This minimizes latency. To prevent the consumer from drowning, you set a "Prefetch" limit, acting as a brake.
- **Pull (Kafka):** The consumer asks the broker for a batch of messages. To prevent the consumer from spamming the broker in a busy-loop when the topic is empty, the consumer uses a "Long Poll" (e.g. wait up to 500ms for data to arrive).

### The failure

- Push overwhelms a slow consumer with no prefetch limit. If you use a push broker and forget to set a prefetch limit (meaning `prefetch=0` or unlimited), the broker will blast 100,000 messages into the RAM of your Node.js worker the second they arrive. The worker will OOM and crash. Conversely, if you write a custom pull consumer and forget to use long-polling, your worker will fire 10,000 HTTP requests per second asking an empty broker for data, DDOSing your own infrastructure
