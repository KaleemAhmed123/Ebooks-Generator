### The quota model

```ts
const plan = await getPlan(tenantId)
const used = Number(await redis.get(`spend:${tenantId}:${today}`) ?? 0)

if (used > plan.dailyTokenBudget) throw new HttpError(429, "ai_quota_exceeded")
```

- **Meter in tokens internally, present it as something a customer understands**: messages, documents, or credits
- **A soft limit that warns before a hard one that blocks.** A feature that stops with no warning is a support ticket every time

### Bring your own key

- Enterprise customers often want their own provider account, so their usage and their data policy are theirs
- Store the key encrypted, as Booklet 3 covers, and **never log it or echo a provider error containing it**
- Their rate limit is now yours to respect, and their key expiring is now an incident you must detect and report clearly
