## Latency is a distribution

- One request does not have *a* latency. A million requests have a shape
- A **percentile** cuts that shape: **p50** is the median, half of requests were faster. **p99** is the value 99% of requests beat, and 1% did not
- The mean is the one number that describes no actual request. A few slow outliers pull it up; it hides both the typical case and the tail

<svg viewBox="0 0 460 104" role="img" aria-label="A right-skewed latency histogram with p50 near the peak, the mean pulled to the right of it, and p99 far out in the long tail" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <path d="M20 84 L20 20" stroke="#e0e0e4"/><path d="M20 84 L440 84" stroke="#1a1a1a"/>
  <path d="M20 84 C60 84 70 10 100 10 C130 10 150 70 200 78 C260 82 340 83 440 84" fill="#e2fcf3" stroke="#1d4e89" stroke-width="1.5"/>
  <line x1="104" y1="84" x2="104" y2="12" stroke="#1a1a1a" stroke-dasharray="3 2"/>
  <text x="104" y="98" text-anchor="middle" font-family="Consolas,monospace">p50 · 40 ms</text>
  <line x1="168" y1="84" x2="168" y2="30" stroke="#6b6b6b" stroke-dasharray="3 2"/>
  <text x="168" y="26" text-anchor="middle" fill="#6b6b6b">mean · 90 ms</text>
  <line x1="380" y1="84" x2="380" y2="40" stroke="#1a1a1a" stroke-dasharray="3 2"/>
  <text x="380" y="98" text-anchor="middle" font-family="Consolas,monospace">p99 · 1,100 ms</text>
  <text x="440" y="74" text-anchor="end" fill="#6b6b6b">the tail →</text>
</svg>

### Why p99 is the number that matters

- The users who make the most requests are the ones who hit the tail most often. Heavy users are usually the most valuable ones
- A request that fans out to *n* backends waits for the slowest. With 100 backends each fine at p99, the chance that at least one is in its slow 1% is 1 − 0.99¹⁰⁰ ≈ 63%. The backend p99 becomes the user's p50
- So a system is judged at its tail, and the tail is where the interesting engineering is

### The failure

- "Average latency 50 ms" on the dashboard while 5% of requests take a second. Every number is true. The support queue is full
- Reporting p99 per minute, then averaging the minutes. An average of percentiles is not a percentile; keep the histogram and compute at the end
