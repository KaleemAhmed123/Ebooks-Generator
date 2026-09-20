## Handling abandoned carts

- What happens if the user closes their browser window during the 10-minute reservation? The ticket is stuck in the `RESERVED` state. If we don't return it to `AVAILABLE`, the concert will be sold out, but the seats will be physically empty
- We need a reliable mechanism to expire the reservation exactly 10 minutes later

```typescript
// Using an SQS Delay Queue (The most reliable pattern)
async function reserveTicket(ticketId: string, userId: string) {
  // 1. Mark reserved in DB
  await db.query('UPDATE tickets SET status = "RESERVED" WHERE id = ?', [ticketId]);
  
  // 2. Schedule a check exactly 10 minutes from now
  await sqs.sendMessage({
    QueueUrl: 'checkout-timeouts',
    MessageBody: JSON.stringify({ ticketId, userId }),
    DelaySeconds: 600 // 10 minutes
  });
}

// 10 minutes later, the SQS worker wakes up
async function processTimeout(message) {
  const { ticketId, userId } = message;
  
  // 3. Fencing check: Is this ticket STILL reserved by this user?
  // If they paid, it would be 'SOLD'. If so, do nothing.
  await db.query(`
    UPDATE tickets SET status = "AVAILABLE", user_id = NULL 
    WHERE id = ? AND user_id = ? AND status = "RESERVED"
  `, [ticketId, userId]);
}
```

- **Alternatives**: You could use Redis TTL keys or a Database Cron Job. Delay Queues (like AWS SQS) are the industry standard for time-based distributed state transitions.

### The failure

- Relying entirely on the browser to send a "cancel" request. If your frontend executes a `fetch('/cancel')` when the modal closes, you are trusting the client. If the user loses WiFi or closes the tab too fast, the cancel request never fires. The server must unilaterally enforce the timeout.
