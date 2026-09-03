## Canary Deployment

Release to a small slice of traffic, watch the metrics, then widen.

<svg viewBox="0 0 460 86" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A new version takes five percent of traffic and is observed before rolling on to twenty-five and a hundred percent, or being rolled back">
  <rect x="4" y="30" width="86" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="47" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#1a1a1a">v2</text>
  <path d="M90 44 H120" stroke="#1a1a1a" stroke-width="1.3"/><path d="M122 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="126" y="30" width="120" height="28" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="186" y="43" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5" fill="#d0212f">5% of traffic</text>
  <text x="186" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">observed 20 min</text>
  <path d="M246 44 H282 M282 18 V70 M282 18 H310 M282 70 H310" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M312 18 l-7 -4 v8 z M312 70 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="318" y="22" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">healthy → 25% → 100%</text>
  <text x="318" y="74" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">regression → roll back</text>
</svg>

Twenty minutes of a 5% slice may not carry enough traffic to detect a 1%
regression at all. Size a canary by the number of events observed, not by
minutes on a clock.

## Cardinality

The number of distinct label combinations on a metric. It decides whether the
metrics server survives the week.

| Labels on `http_requests_total` | Time series |
|---|---|
| route (20) × method (4) × status (6) | 480 |
| the same, plus `user_id` (2M users) | 960,000,000 |

Adding an identifier as a label is one word in a code review and an out-of-memory
kill in Prometheus. Unbounded values belong in logs and traces, which are indexed
for exactly that.

## Chaos Engineering

Injecting failure under production-like conditions to check that the resilience
you designed still works.

You kill a random pod during business hours to confirm a failover written a year
ago still fires. Often it does not — a timeout was changed, or the health check
now passes while the process is wedged.

Run it without a stated hypothesis and you have simply caused an outage. Name
what should happen and which SLI proves it, then break something.
