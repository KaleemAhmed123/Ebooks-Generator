### Seed data

```ts
// prisma/seed.ts, committed and deterministic
await db.seller.create({ data: { id: 's_1', name: 'Kaleem', email: 'kaleem@example.com' } })
await db.order.createMany({ data: [ /* one of every status */ ] })
```

- **Cover every state the interface can show**: pending, paid, refunded, failed, cancelled. Otherwise those paths are only ever tested in production
- **Never seed from a production dump.** Module 7's staging page covers why

### What must not be required locally

- **Production credentials of any kind.** A local environment that needs a real API key is one leak away from an incident
- Use provider sandboxes, or a fake. Stripe, Razorpay and Twilio all have test modes
