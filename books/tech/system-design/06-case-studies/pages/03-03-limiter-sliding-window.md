## Sliding window approximation

- To fix the fixed-window boundary problem without the memory cost of tracking every single request timestamp (a sliding log), we use a sliding window approximation. This is the exact algorithm Cloudflare uses to protect millions of websites
- The algorithm tracks the counter for the previous window and the current window. It calculates the request rate by taking a weighted sum of the previous window and the current window
- If you are 15 seconds into a 60-second window (25% through), the algorithm assumes the traffic in the previous window was evenly distributed. It takes 75% of the previous window's counter and adds it to the current window's counter
- The formula is: `rate = previous_count * ((T - elapsed) / T) + current_count`. Cloudflare tested this against 400 million requests from 270,000 sources and found it made the wrong decision only 0.003% of the time, with zero false positives

```typescript
function isAllowed(prev: number, curr: number, elapsed: number, window: number, limit: number) {
  const previousWeight = (window - elapsed) / window;
  const estimated = Math.floor(prev * previousWeight) + curr;
  return estimated < limit;
}
```

### The failure

- The failure mode is proposing an exact sliding log algorithm (storing a Redis sorted set of every timestamp per user) for a high-traffic API
- Storing a timestamp for every request consumes massive amounts of memory. If a malicious user sends a million requests, your limiter must store a million timestamps before rejecting them. That is a Denial of Service attack against your rate limiter

:::interview
**The pragmatic memory test**
Interviewers love the sliding window approximation because it proves you value O(1) memory and O(1) time complexity over perfect mathematical accuracy for a business problem.
:::
