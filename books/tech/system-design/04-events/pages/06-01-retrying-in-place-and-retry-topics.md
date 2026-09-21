# Module 6 - Retries, poison messages, DLQ, backpressure

## Retrying in place, and retry topics

- A handler that fails and retries in a loop holds its place. On a log that place is the partition: nothing behind the record is read until it succeeds. On a queue it is a prefetch slot, and with the slot count exhausted the consumer is stalled the same way
- Sleeping in the loop is worse. A Kafka consumer that sleeps five minutes between attempts stops polling, crosses `max.poll.interval.ms`, and is evicted (Module 3, page 5); the record is then redelivered to whoever gets the partition, which retries it again

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

- **Retry topics** move the wait out of the partition. The handler publishes the failed record to `orders.retry.1m` and commits the original. A second consumer reads the retry topic, waits out the delay, tries again, and on failure publishes to `orders.retry.5m`; after the last tier, the dead-letter topic (page 3). The main partition never stops
- Delay is per tier, not per record: a consumer of `retry.1m` holds each record until it is a minute old, then processes. Simple, and it means every record in that tier waits the same minute

### The failure

- Retry topics break per-key ordering by design. `ItemAdded` for user 42 hits a lock, goes to the retry tier; `Checkout` for user 42 arrives two seconds later on the main topic and succeeds against an empty cart; a minute later `ItemAdded` applies. Keys that need order cannot leave the lane. For those, the choice is to block the partition and page someone, or make the handler tolerate the gap
