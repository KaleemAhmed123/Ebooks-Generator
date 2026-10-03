## Load testing with k6

- Capacity math predicts the knee; a **load test** finds where it *actually* is — before real traffic does. You generate controlled load, ramp it up, and watch the SLIs (p99, error rate) until they break. The number you want is the **breaking point**: the request rate at which latency bends past your SLO or errors start. Then you know your real headroom and your autoscaling targets.
- **k6** (open-source, scripted in JavaScript) is the common tool. The one thing that matters for honest results: use **arrival-rate executors**, which send at a **fixed requests-per-second regardless of how fast the system responds** — this is the fix for **coordinated omission** (Module 3.3). A closed/VU-only model waits for each response and under-reports the tail; arrival-rate keeps firing and exposes the real backlog.

:::mint
```javascript
import http from 'k6/http';
export const options = {
  scenarios: { ramp: {
    executor: 'ramping-arrival-rate',   // fixed rate → no coordinated omission
    startRate: 50, timeUnit: '1s',
    stages: [{ target: 500, duration: '2m' }, { target: 2000, duration: '3m' }],
    preAllocatedVUs: 200,
  }},
  thresholds: { http_req_duration: ['p(99)<300'], http_req_failed: ['rate<0.01'] },
};
export default function () { http.get('https://api.internal/health'); }
```
:::

:::lab
Deploy the Booklet 6 app on kind, point k6 at it with the ramping-arrival-rate scenario above, and **push until a threshold fails**. Watch in Grafana (Module 2.3): p99 stays flat, then bends — that bend is your **knee**, and the rate where `http_req_duration: p(99)<300` goes red is your breaking point. Now trigger the **HPA** (Booklet 6.5) and re-run: the breaking point should move out as pods scale. Note the **gap** between the spike and the scale-up — that lag is the standing headroom you must keep (Module 4.1). Record the max safe rate as your capacity number.
:::

- Run load tests **against a prod-like environment**, not a laptop (different CPU, network, and data give a different knee), and **ramp**, don't slam — a gradual ramp shows the whole curve and the exact knee, while a spike only says pass/fail. Make it repeatable in CI (Booklet 7) so a regression that moves the knee inward is caught before release.
