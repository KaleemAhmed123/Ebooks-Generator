## Token bucket

- The Token Bucket is the industry-standard algorithm for rate limiting (used heavily by Stripe). It is intuitive and supports "bursts" of traffic
- Imagine a bucket. The bucket holds a maximum number of tokens (the capacity, $b$). Every second, you add $r$ new tokens to the bucket. If the bucket is full, new tokens spill over and are lost
- When a request arrives, you check if the bucket has at least 1 token. If it does, you take the token and allow the request. If the bucket is empty, you reject the request with HTTP 429

<svg viewBox="0 0 460 140" role="img" aria-label="Token bucket algorithm. Tokens drip in at rate R. Requests take tokens out." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M150 40 L150 110 L210 110 L210 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  
  <circle cx="165" cy="100" r="8" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="180" cy="100" r="8" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="195" cy="100" r="8" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="170" cy="85" r="8" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="185" cy="85" r="8" fill="#e2fcf3" stroke="#1d4e89"/>
  
  <path d="M180 15 L180 35" stroke="#4a8f3c" stroke-width="2" fill="none"/>
  <path d="M177 32 l3 5 l3 -5 z" fill="#4a8f3c"/>
  <text x="180" y="10" text-anchor="middle" font-size="7">Refill Rate (r)</text>
  
  <path d="M220 95 L270 95" stroke="#b8541a" stroke-width="2" fill="none"/>
  <path d="M267 92 l5 3 l-5 3 z" fill="#b8541a"/>
  <text x="245" y="88" text-anchor="middle" font-size="7">Request Takes Token</text>
  
  <text x="180" y="125" text-anchor="middle" font-weight="bold">Capacity (b) = Max Burst</text>
</svg>

````typescript
class TokenBucket {
  tokens = 10; lastRefill = Date.now();
  consume() {
    const now = Date.now();
    this.tokens = Math.min(10, this.tokens + ((now - this.lastRefill) / 1000 * 2));
    this.lastRefill = now;
    if (this.tokens < 1) return false; // Limited
    this.tokens -= 1; return true; // Allowed
  }
}
````

### The failure

- The failure is making the bucket capacity ($b$) too large. Capacity is the maximum possible burst. If you refill at 10 requests per second, but capacity is 1,000, an idle user can suddenly send 1,000 requests in one second
- If all users burst simultaneously, your database will crash. The burst capacity must be carefully tuned to what the backend can survive in a spike
