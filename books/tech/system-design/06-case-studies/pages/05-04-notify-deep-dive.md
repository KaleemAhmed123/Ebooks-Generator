## Deep dive: Retries and dedupe

- When a worker calls Twilio and it fails, we cannot drop the message. We retry. But immediate retries will overwhelm a struggling provider (retry storm)
- **Exponential backoff and jitter:** Wait 1s, then 2s, then 4s, adding a random jitter (e.g., ±20%) so all workers don't retry at the exact same millisecond
- **Dead Letter Queue (DLQ):** After 5 failed attempts, we stop retrying and move the message to a DLQ. An engineer inspects the DLQ later to see if it was a bad payload or a permanent outage

<svg viewBox="0 0 460 90" role="img" aria-label="Retry loop with backoff and Dead Letter Queue" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="45" text-anchor="middle" font-weight="bold" fill="#1d4e89">Worker</text>
  
  <rect x="180" y="20" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="220" y="45" text-anchor="middle" font-weight="bold" fill="#b8541a">Provider (503)</text>
  
  <rect x="180" y="70" width="80" height="15" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="220" y="81" text-anchor="middle" font-weight="bold">DLQ</text>
  
  <path d="M100 30 L180 30" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 50 L100 50" stroke="#b8541a" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
  <text x="140" y="25" text-anchor="middle" font-size="6">1. Request</text>
  <text x="140" y="60" text-anchor="middle" font-size="6" fill="#b8541a">2. Fail (retry++ -> Delay Queue)</text>
  
  <path d="M60 60 L60 80 L180 80" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="110" y="75" text-anchor="middle" font-size="6">3. Give up (retry > 5)</text>
</svg>

- **Dedupe:** The queue guarantees at-least-once delivery, which means workers might receive the same message twice. The worker checks Redis: `SETNX notif:123:sent 1 EX 86400`. If it returns 0, another worker already sent it, so we drop it.

### The failure

- Infinite immediate retries. The provider is struggling, and your cluster hammers it with 10,000 retries per second until it completely dies

:::interview
Your worker encounters a 503 from SendGrid. It immediately puts the message back on the top of the queue. The queue processes 10k messages a second. What happens to SendGrid, and what happens to your queue?

You cause a retry storm. SendGrid is hammered with immediate retries, ensuring it stays down. Meanwhile, your queue fills up entirely with failing messages, starving healthy traffic. You must use exponential backoff with jitter and a Dead Letter Queue.
:::
