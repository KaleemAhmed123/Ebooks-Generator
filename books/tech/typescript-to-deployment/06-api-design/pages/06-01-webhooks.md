# Module 6 - Webhooks and async APIs

## Sending webhooks

- Polling wastes both sides. A client asking every ten seconds whether anything changed is almost always told no
- A **webhook** inverts it. You call the customer when something happens, which makes your API push as well as pull
- The difference from an internal message queue is that you are calling a server you do not control, that may be down, slow, or malicious

```json
{
  "id": "evt_8f14e45f",
  "type": "order.paid",
  "createdAt": "2026-08-30T10:15:00Z",
  "apiVersion": "2026-08-01",
  "data": { "orderId": "o_842", "totalPaise": 50000 }
}
```

### What every field is doing

- **`id`** is what the receiver uses to deduplicate, and it must be stable across retries
- **`type`** lets them subscribe to some events and ignore others
- **`apiVersion`** lets you change the payload later without breaking existing receivers
- **`data` is a reference, not a snapshot to be trusted.** Well-built receivers call your API to confirm the current state

### The delivery rules

- **Sign every request** so the receiver can tell it came from you
- **Retry with backoff** over hours, not seconds, because their outage is not instant
- **Deliver from a queue**, never inline in the request that caused the event
- **Give up eventually** and mark the endpoint failing, or a dead customer endpoint consumes your workers forever
