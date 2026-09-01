# Module 8 - Correctness patterns

## Idempotency

- **Idempotent** means doing something twice has the same effect as doing it once
- Every distributed system needs it, because every distributed system retries, and a retry is indistinguishable from a duplicate
- Some operations are naturally idempotent. Setting a status to `paid` twice leaves it `paid`
- Others are not, and those are the dangerous ones. Adding 500 to a wallet twice adds 1000

### Making an operation idempotent

- Give every operation a **key that identifies the intent**, not the attempt
- Record that key when the work is done, in the same transaction as the work
- On arrival, check whether the key has been seen. If it has, return the previous result and do nothing

```ts
await db.$transaction(async (tx) => {
  const existing = await tx.processedEvent.findUnique({ where: { id: event.id } })
  if (existing) return

  await tx.wallet.update({
    where: { sellerId },
    data: { balancePaise: { increment: event.amount } },
  })

  await tx.processedEvent.create({ data: { id: event.id } })
})
```
