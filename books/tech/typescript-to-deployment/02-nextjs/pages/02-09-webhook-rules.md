## The three webhook rules

### 1. Answer fast, work later

- Providers retry when you are slow, and a retry is a second delivery
- Verify, write the event down, return 200, do the work after

### 2. Be idempotent

- Delivery is at least once. The same event will arrive twice
- Key the work on the provider's event id, not on your own row

```ts
const existing = await db.events.findUnique({ where: { id: event.id } })
if (existing) return new Response("ok", { status: 200 })
```

- Returning 200 for a duplicate is correct. The work is already done

### 3. Never trust the payload for money

- The payload says an order was paid. It does not prove it
- Re-read the amount from your own database and compare
- A webhook body is a message from the internet, not a source of truth

:::note
A webhook route is the one endpoint you cannot put behind session auth, because the caller has no session. The signature is the entire authentication. Treat it that way.
:::
