### The four rules that outlive any provider

- **Amounts are integers in the smallest unit.** Paise, cents. A float will eventually be off by one
- **The webhook is the source of truth, not the browser callback.** A user closing the tab must not lose the payment
- **Verify the signature before parsing.** An unverified webhook is an unauthenticated endpoint that moves money
- **Be idempotent on the provider's event id.** Every provider retries, and a duplicated credit is very hard to unwind

```ts
const seen = await db.paymentEvents.findUnique({ where: { id: event.id } })
if (seen) return res.sendStatus(200)
```

- Never recompute the amount from the request. Read it from your own order row
