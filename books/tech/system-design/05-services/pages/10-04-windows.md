## Fixed vs sliding window

- A Fixed Window counter is the simplest algorithm: reset a counter to zero at the start of every minute. `Minute 1: 5 reqs. Minute 2: 2 reqs.`
- The problem is the "Boundary Burst". If your limit is 100 per minute, a user can send 100 requests at 12:00:59, and another 100 requests at 12:01:01. They bypassed the limit by sending 200 requests in 2 seconds

<svg viewBox="0 0 460 140" role="img" aria-label="Boundary burst. 100 requests at the end of window 1, 100 at the start of window 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 100 L420 100" stroke="#1a1a1a"/>
  
  <rect x="185" y="30" width="10" height="70" fill="#b8541a"/>
  <text x="190" y="25" text-anchor="middle" font-size="7">100 reqs</text>
  
  <rect x="205" y="30" width="10" height="70" fill="#b8541a"/>
  <text x="210" y="25" text-anchor="middle" font-size="7">100 reqs</text>
  
  <path d="M200 100 L200 120" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="200" y="135" text-anchor="middle" font-weight="bold">12:01:00 (Window Reset)</text>
  
  <path d="M100 100 L100 110" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="100" y="125" text-anchor="middle" font-size="7">12:00:00</text>
  
  <path d="M300 100 L300 110" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="300" y="125" text-anchor="middle" font-size="7">12:02:00</text>
</svg>

- A **Sliding Window Log** fixes this by storing the exact timestamp of every request in Redis, and counting how many occurred in the rolling 60 seconds before `now()`. This is perfectly accurate, but takes too much memory
- Cloudflare invented the **Sliding Window Approximation**: keep the simple Fixed Window counters, but blend the previous minute with the current minute based on time overlap:
  `rate = (prev_minute_count * overlap_fraction) + current_minute_count`

| Algorithm | Memory Cost | Accuracy | Vulnerable to Boundary Burst? |
|---|---|---|---|
| **Fixed Window** | Extremely Low | Low | Yes (2x burst) |
| **Sliding Window Log** | High | Perfect | No |
| **Sliding Window Approx** | Very Low | Excellent (~1% error) | No |

### The failure

- The failure is using the Sliding Window Log in high-throughput systems. If the limit is 1,000,000 requests per hour, you have to store and prune 1,000,000 individual timestamps in memory for every single user. This is a massive memory leak. Use Cloudflare's Approximation instead
