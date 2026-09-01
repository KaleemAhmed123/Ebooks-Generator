### Delayed and repeatable

```ts
await payouts.add("release", { payoutId }, { delay: 7 * 86400 * 1000 })

await reports.add("daily", {}, {
  repeat: { pattern: "0 2 * * *", tz: "Asia/Kolkata" },
  jobId: "daily-report",
})
```

- A fixed `jobId` on a repeatable job stops duplicates piling up on every deploy

### Idempotency

```ts
await orders.add("fulfil", { orderId }, { jobId: `fulfil:${orderId}` })
```

- BullMQ refuses a job whose id already exists
- A retry after a crash then cannot double-charge or double-ship
