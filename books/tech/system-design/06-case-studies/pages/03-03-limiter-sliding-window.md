## Sliding window approximation

- The fixed window's boundary problem goes away if the count covers the last 60 seconds rather than the current clock minute. The exact way is a **sliding log**: store every request's timestamp per key and count those newer than now − 60 s. Memory is then proportional to requests, which is the attacker's choice of number
- Cloudflare's approximation keeps two counters per key, the previous window's and the current one's, and assumes the previous window's requests were spread evenly across it

```ts
// window T seconds; elapsed = seconds into the current window
function estimate(prev: number, cur: number, elapsed: number, T: number): number {
  return prev * ((T - elapsed) / T) + cur;
}
// limit 100/min, 15 s into the minute: prev 84, cur 36
estimate(84, 36, 15, 60);   // 84 × 0.75 + 36 = 99  → allowed
estimate(84, 37, 15, 60);   // 100  → refused
```

- Memory is two integers per key regardless of load. Time is one read of each counter, or one read of a hash holding both. The window boundary still exists, but a burst straddling it is counted at its weighted share, so the 200-in-two-seconds case on page 2 is refused
- Cloudflare measured it: over 400 M requests from 270 000 sources, 0.003 % of decisions were wrong in either direction, the average rate error was 6 %, and there were zero false positives. That is the number to give when the interviewer asks how much the approximation costs
- The assumption is the only weakness: if last minute's 84 requests all arrived in its final second, the estimate is high; if in its first second, low. For a fence around an API the error is a few percent of the limit and nobody bills on it

### The failure

- A sorted set per key with one entry per request. The limiter now stores a timestamp for every request it will refuse, so a client sending a million requests forces a million writes into the limiter's store before being told no. The component built to shed load became the easiest thing to overload
