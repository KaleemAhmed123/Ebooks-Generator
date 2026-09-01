## Retries, and how they cause outages

- A retry turns a transient failure into a success, and turns a struggling service into a dead one
- When a dependency slows down, every caller retries, tripling its load at the exact moment it can least afford it
- That is a **retry storm**, and it is why retries need three rules rather than one

### 1. Only retry what is safe

- `GET`, `PUT`, `DELETE` are idempotent. `POST` is not, unless it carries an idempotency key
- Retry a timeout, a connection reset, a 502, 503 or 504
- **Never** retry a 400, 401, 403 or 422. The request is wrong and will stay wrong

### 2. Back off, with jitter

```ts
const delay = Math.min(1000 * 2 ** attempt, 30_000)
await sleep(delay * (0.5 + Math.random() * 0.5))
```

- Exponential backoff spreads attempts out. **Jitter** stops every client retrying at the same instant
- Without jitter, a thousand clients that failed together retry together, forever

### 3. Cap the total, and stop retrying at the edge

- Three attempts is usually right. Five is the most that is ever justified
- If each of four layers retries three times, one user request becomes 81 calls to the bottom service
- **Retry at one layer only**, as close to the failure as possible
