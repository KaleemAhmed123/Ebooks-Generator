# Module 9 - Running it in production

## Controlling the spend

- This is the only dependency in the book where a single user can cost you an unbounded amount of money in an afternoon
- There is no natural ceiling. A loop, a long document, or a script hitting your endpoint scales the bill linearly and silently
- **Budget enforcement belongs in code, not in a monthly review**

### The four layers, outermost first

| Layer | Stops |
|---|---|
| provider spend limit on the key | the catastrophic case |
| per-tenant daily token budget | one customer consuming everything |
| per-request input cap | a pasted novel |
| per-run step and token budget | the agent that loops |

```ts
const KEY = `spend:${tenantId}:${new Date().toISOString().slice(0, 10)}`

const spent = Number(await redis.get(KEY) ?? 0)
if (spent > plan.dailyTokenBudget) {
  throw new HttpError(429, "daily_ai_budget_exceeded")
}

// after the call
await redis.incrby(KEY, usage.inputTokens + usage.outputTokens * 4)
await redis.expire(KEY, 172_800)
```
