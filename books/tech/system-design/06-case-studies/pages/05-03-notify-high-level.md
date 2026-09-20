## High-level design

- A synchronous design is fatal here. If we call Apple's API synchronously while the user is checking out, and Apple is slow, the checkout fails. We must decouple (→04)

<svg viewBox="0 0 460 140" role="img" aria-label="API writes to separate queues for SMS, Push, and Email" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="50" width="70" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="45" y="75" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Server</text>
  
  <rect x="120" y="10" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="160" y="27" text-anchor="middle" font-weight="bold">SMS Queue</text>
  
  <rect x="120" y="55" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="160" y="72" text-anchor="middle" font-weight="bold">Push Queue</text>
  
  <rect x="120" y="100" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="160" y="117" text-anchor="middle" font-weight="bold">Email Queue</text>
  
  <rect x="240" y="10" width="60" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="270" y="27" text-anchor="middle" font-weight="bold" fill="#1d4e89">Workers</text>
  
  <rect x="240" y="55" width="60" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="270" y="72" text-anchor="middle" font-weight="bold" fill="#1d4e89">Workers</text>
  
  <rect x="240" y="100" width="60" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="270" y="117" text-anchor="middle" font-weight="bold" fill="#1d4e89">Workers</text>
  
  <rect x="340" y="30" width="80" height="80" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="75" text-anchor="middle" font-weight="bold" fill="#b8541a">3rd Party APIs</text>
  <text x="380" y="90" text-anchor="middle" font-size="6" fill="#b8541a">(Twilio, APNs, SES)</text>
  
  <path d="M80 60 L120 25" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M80 70 L120 70" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M80 80 L120 115" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  
  <path d="M200 22 L240 22" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M200 67 L240 67" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M200 112 L240 112" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  
  <path d="M300 22 L340 50" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M300 67 L340 67" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M300 112 L340 90" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

- **Independent Queues:** We must split the queues by channel. If we use one massive queue, and APNs goes down, the queue backs up. Millions of blocked push notifications will prevent SMS messages from being processed. Isolation prevents one provider's outage from breaking the others

### The failure

- Using one global queue for all notifications. The slow consumer problem guarantees that a delay in emails will delay OTP SMS texts

:::interview
You use one Kafka topic for all notifications. Apple Push Network degrades and takes 2 seconds per request instead of 50ms. What happens to the user trying to log in with an SMS code?

Their SMS is delayed indefinitely. Because all notifications share a single queue, the slow consumption of Push notifications creates a massive backlog, blocking the SMS messages stuck behind them. You must isolate channels into independent queues.
:::
