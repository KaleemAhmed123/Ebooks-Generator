## Algorithms: Buckets and windows

- The **Token Bucket** gives a bucket of size N. Tokens refill steadily. It allows bursts up to the bucket size
- The **Leaky Bucket** uses a queue. Requests process at a fixed rate, preventing bursts entirely
- The **Fixed Window** counts requests per time block. It's efficient but allows 2x boundary bursts

```typescript
class TokenBucket {
  tokens: number; lastRefill = Date.now();
  constructor(public cap: number, public rateMs: number) { this.tokens = cap; }
  allow(): boolean {
    const now = Date.now();
    this.tokens = Math.min(this.cap, this.tokens + ((now - this.lastRefill) * this.rateMs));
    this.lastRefill = now;
    if (this.tokens < 1) return false;
    this.tokens--; return true;
  }
}
```

### The failure

- The failure mode is choosing the fixed window algorithm without mentioning the boundary burst problem
- If the limit is 100 requests per minute, a malicious user can send 100 requests at 00:59 and 100 requests at 01:00, forcing your server to handle 200 requests in two seconds. The fixed window alone is dangerous for APIs

:::interview
**The burst test**
Interviewers ask "what if all the traffic comes at once?" to test if you understand token bucket burst capacity versus leaky bucket smoothing. Know which one your proposed API needs.
:::
