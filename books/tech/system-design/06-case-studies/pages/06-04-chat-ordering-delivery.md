## Ordering and delivery receipts

- **Ordering:** There is no such thing as global ordering across millions of chats. We only care about ordering *within* a single channel. Because we use Snowflake IDs, the ID itself provides the exact chronological order.
- **Delivery Receipts:** Sent, Delivered, and Read are three separate events.
  - **Sent:** The API server received it and saved it to Cassandra.
  - **Delivered:** Alice's Gateway pushed it to Alice's phone, and the phone ack'd it.
  - **Read:** Alice opened the app, and the app sent an HTTP POST `/read`.
- Do not store these as updates on the message row! Cassandra hates updates. Treat them as separate events pushed down the WebSocket

<svg viewBox="0 0 460 100" role="img" aria-label="Delivery receipts are separate events" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="55" text-anchor="middle" font-weight="bold">Alice's Phone</text>
  
  <rect x="180" y="10" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="30" text-anchor="middle" font-weight="bold" fill="#1d4e89">Gateway</text>
  
  <rect x="340" y="10" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="30" text-anchor="middle" font-weight="bold" fill="#b8541a">Database</text>
  
  <path d="M100 40 L180 30" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="140" y="30" text-anchor="middle" font-size="6">1. HTTP POST /read</text>
  
  <path d="M260 25 L340 25" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="300" y="20" text-anchor="middle" font-size="6">2. Save Read State</text>
  
  <path d="M220 40 L220 80 L100 60" stroke="#1d4e89" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
  <text x="160" y="75" text-anchor="middle" font-size="6">3. WebSocket Push: "Alice Read"</text>
</svg>

### The failure

- Attempting to guarantee exactly-once delivery. The network is flaky. The gateway will retry pushing. The client must perform deduplication using the `message_id` (→04)

:::interview
Your chat app occasionally shows the exact same message twice in a row. What happened, and how do you fix it?

The gateway pushed the message, but the TCP ACK from the client was dropped by a flaky cell tower. The gateway retried. The client must maintain a local set of recently seen `message_id`s and silently ignore duplicates.
:::
