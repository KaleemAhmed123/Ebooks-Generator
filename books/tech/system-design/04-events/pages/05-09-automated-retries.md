## Automated retries

- What if the error isn't a permanent schema bug, but a temporary outage of a downstream API? You don't want to DLQ the message; you want to retry it later using **Exponential Backoff**. 
- In a traditional queue, you can just `nack` the message and ask the broker to hide it for 5 minutes. But in a Log (like Kafka), you cannot skip around. If you pause the consumer, the partition halts

<svg viewBox="0 0 460 140" role="img" aria-label="Automated retries. Main Topic sends failed messages to a Retry 1m Topic, which routes to a Retry 5m Topic, which routes to a DLQ." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="65" text-anchor="middle" font-weight="bold">Main Topic</text>
  <text x="60" y="78" text-anchor="middle" font-size="6">Fails</text>
  
  <path d="M100 70 L130 70" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M130 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="140" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="180" y="65" text-anchor="middle" font-weight="bold">Retry: 1m</text>
  <text x="180" y="78" text-anchor="middle" font-size="6">Sleeps 1m, Fails</text>
  
  <path d="M220 70 L250 70" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M250 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="260" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="300" y="65" text-anchor="middle" font-weight="bold">Retry: 5m</text>
  <text x="300" y="78" text-anchor="middle" font-size="6">Sleeps 5m, Fails</text>
  
  <path d="M340 70 L370 70" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M370 70 l-6 -3 v6 z" fill="#b8541a"/>
  
  <rect x="380" y="50" width="60" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="410" y="72" text-anchor="middle" font-weight="bold" fill="#b8541a">DLQ</text>
</svg>

- To retry later in Kafka, you must create dedicated Retry Topics. The consumer immediately writes the failed message to `retry-1m` and Acks the original. A separate consumer reads `retry-1m`, sleeps for 60 seconds, and tries again. If it fails, it pushes to `retry-5m`. 

### The failure

- Sleeping for 5 minutes inside the main consumer triggers a rebalance. A junior developer writes a `try { ... } catch { await sleep(300000); }` loop directly inside the main consumer. The consumer thread freezes for 5 minutes. The broker's `max.poll.interval.ms` limit is breached. The broker assumes the consumer is dead, kicks it out of the group, and triggers a stop-the-world rebalance. You must never block the main consumer thread; offload retries to a separate topic
