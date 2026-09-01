# Module 4 - Asking for a change

## The shape of a good request

- Module 3 was about large work. This is about the everyday request, where most of the time actually goes
- **A weak prompt does not fail loudly.** It produces something reasonable that is not what you wanted, and you find out during review

### The four parts

| Part | Answers |
|---|---|
| **the goal** | what should be true when this is done |
| **the anchor** | where in the codebase, and what to copy |
| **the constraints** | what must not change, what not to add |
| **the check** | how it will know it worked |

```text
Weak:
  Add rate limiting to the API.

Better:
  Add per-user rate limiting to POST /api/v1/payouts: 10 per minute,
  429 with a Retry-After header.

  Follow the existing middleware in apps/api/middleware/rateLimit.ts and use
  the shared Redis client from packages/shared/redis. Do not add a dependency.

  Add tests in the same style as apps/api/routes/orders.test.ts.
  Run `npx vitest run apps/api/routes/payouts.test.ts` until it passes.
```
