## Token bucket, leaky bucket, fixed window

- Three counters, distinguished by one question: what happens to a burst. Booklet 05 owns each algorithm in depth; the interview wants the comparison in one table and the choice defended by the burst behaviour the API needs

| Algorithm | State per key | A burst of 100 at once, limit 100/min | Steady rate |
| :--- | :--- | :--- | :--- |
| token bucket | tokens, last refill time | all 100 pass if the bucket is full; then 100/min trickle | refill rate |
| leaky bucket | a queue of pending requests | queued and released at 100/min; the queue is the delay | drain rate |
| fixed window | one count per clock minute | 100 pass at 00:59, 100 more at 01:00: 200 in two seconds | resets on the boundary |

- **Token bucket**: capacity B, refilled at r tokens a second; a request takes one token or is refused. B is the burst allowed, r the sustained rate, and public APIs document limits in exactly those two numbers

```ts
class TokenBucket {
  private tokens: number; private last = Date.now();
  constructor(private cap: number, private perSec: number) { this.tokens = cap; }
  allow(now = Date.now()): boolean {
    this.tokens = Math.min(this.cap, this.tokens + ((now - this.last) / 1000) * this.perSec);
    this.last = now;
    if (this.tokens < 1) return false;
    this.tokens -= 1; return true;
  }
}
```

- **Leaky bucket** smooths instead of allowing: a queue drained at a fixed rate, for a backend that cannot burst, at the price of latency. **Fixed window** is one `INCR` per key per minute; its boundary is the failure below, and page 3 fixes it with one more counter

### The failure

- Fixed window with no mention of the boundary. A limit of 100 a minute admits 100 requests at 00:59 and 100 at 01:00: double the limit in two seconds, every minute, on purpose. The limiter is then a limiter of averages, and the backend was sized for the limit
