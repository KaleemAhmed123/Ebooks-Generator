## Token bucket

- A bucket holds at most `b` tokens and gains `r` of them per second. A request takes one or is rejected. Two numbers, and they mean different things: `r` is the sustained rate, `b` is the largest burst the bucket can ever release at once

<svg viewBox="0 0 460 104" role="img" aria-label="A token bucket. Tokens arrive at r per second into a bucket of capacity b. Each request removes one token; when the bucket is empty the request is rejected with a 429. Capacity b is the maximum burst, because an idle client accumulates up to b tokens and can spend them all at once. An orange cross marks setting b to one thousand with r of ten: a quiet client can fire a thousand requests in one second and still be inside its policy." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">tokens arrive at r per second; capacity b is the largest burst the bucket can release</text>
  <line x1="205" y1="22" x2="205" y2="32" stroke="#1d4e89" marker-end="url(#b)"/><text x="213" y="29" font-size="6.5">+ r per second</text>
  <rect x="160" y="34" width="90" height="42" rx="3" fill="#fff" stroke="#1d4e89"/>
  <rect x="163" y="54" width="84" height="19" fill="#e6f2ff"/>
  <text x="205" y="68" text-anchor="middle" font-size="7">tokens</text>
  <text x="205" y="48" text-anchor="middle" font-size="6" fill="#666">capacity b</text>
  <line x1="250" y1="55" x2="300" y2="55" stroke="#1d4e89" marker-end="url(#b)"/><text x="275" y="51" text-anchor="middle" font-size="6.5">1 per request</text>
  <rect x="304" y="46" width="100" height="18" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="354" y="58" text-anchor="middle" font-size="6.5" fill="#bf4c28">empty → 429</text>
  <text x="100" y="56" font-size="6.5">an idle client</text>
  <text x="100" y="66" font-size="6.5">fills up to b</text>
  <text x="4" y="90" font-size="7">r is what the backend sustains; b is the spike it must survive — they are sized from different numbers</text>
  <text x="4" y="101" font-size="7.5" fill="#bf4c28">✕ b = 1 000 with r = 10: a quiet client fires 1 000 in one second and is still inside its policy</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

```typescript
class TokenBucket {
  private tokens: number;
  private last = Date.now();
  constructor(private rate: number, private capacity: number) {
    this.tokens = capacity;                    // starts full: the first burst is allowed
  }
  take(now = Date.now()): boolean {
    const gained = ((now - this.last) / 1000) * this.rate;
    this.tokens = Math.min(this.capacity, this.tokens + gained);
    this.last = now;                           // refill is computed on read — no timer, no sweep
    if (this.tokens < 1) return false;         // caller returns 429 (page 6)
    this.tokens -= 1;
    return true;
  }
}
```

- Computing the refill on read rather than on a timer makes it cheap per key: a bucket is two numbers, touched only when its owner sends a request, so idle keys cost nothing
- Stripe runs this shape in Redis with a second limiter on *concurrent* requests, because a caller making few but slow requests exhausts workers without exceeding any rate

### The failure

- Capacity chosen for generosity rather than from capacity. `b` is not a comfort setting; it is the number of requests every idle client is entitled to send simultaneously. With ten thousand idle clients and `b = 1 000`, the policy permits ten million requests in one second, and every one of them is compliant
