## Percentiles done right

- Latency has a **distribution**, and the average hides exactly the part that hurts. **Percentiles** read the distribution honestly: **p50** (median — half are faster), **p95**, **p99**, **p99.9** (one in a thousand is slower than this). The tail — p99 and beyond — is where real users wait, time out, and leave.
- Why the tail dominates *experience*, not just a graph: a single page load makes **many** backend calls, so a user meets the tail constantly (Booklet 3's tail-at-scale). If one request in 100 is slow and a page makes 100 calls, **almost every page hits at least one slow call**. Your p99 is most users' *typical* worst moment — which is why SLOs (Module 3.1) are written on p99, not the mean.

<svg viewBox="0 0 360 80" role="img" aria-label="A latency distribution with a long right tail: the mean sits left under the bulk while p99 and p99.9 are far out in the tail where users actually experience slowness" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <path d="M20 60 Q70 10 110 30 T200 52 Q260 60 340 60" fill="#fbe9ee" stroke="#a63d57"/>
  <line x1="70" y1="18" x2="70" y2="60" stroke="#2f7d4f" stroke-dasharray="3 2"/><text x="70" y="14" text-anchor="middle" font-size="5.4" fill="#2f7d4f">p50</text>
  <line x1="95" y1="24" x2="95" y2="60" stroke="#777" stroke-dasharray="2 2"/><text x="95" y="20" text-anchor="middle" font-size="5" fill="#777">mean</text>
  <line x1="250" y1="30" x2="250" y2="60" stroke="#c0392b" stroke-dasharray="3 2"/><text x="250" y="26" text-anchor="middle" font-size="5.4" fill="#c0392b">p99</text>
  <line x1="300" y1="34" x2="300" y2="60" stroke="#c0392b" stroke-dasharray="3 2"/><text x="300" y="30" text-anchor="middle" font-size="5.4" fill="#c0392b">p99.9</text>
  <text x="300" y="72" text-anchor="middle" font-size="5.2" fill="#777">the long tail = where users wait</text>
</svg>

- A trap that voids the whole exercise: **you cannot average percentiles.** The "p99" of ten instances is **not** the mean of their ten p99s — percentiles don't add. You must aggregate the **histogram buckets** across instances and compute the percentile from the merged distribution (what `histogram_quantile` over summed buckets does, Module 2.2). Averaging per-instance p99s silently under-reports your real tail.

:::warn
**Coordinated omission** is the measurement bug that makes your tail look far better than it is. A load generator that sends one request, **waits** for the (slow) response, then sends the next **doesn't record the requests it failed to send** during the stall — so a 10-second freeze that should show thousands of slow requests shows as *one*. The tool "coordinates" with the system under test and omits the backlog. Real users don't wait their turn; they pile up. Use a tool/mode that sends at a **fixed rate** regardless of responses (k6's arrival-rate executors, Module 4.2) and corrects for it, or your p99 is fiction.
:::
