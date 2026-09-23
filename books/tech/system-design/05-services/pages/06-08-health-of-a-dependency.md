## Watching the dependencies

- A service's own success rate describes the service, not the request. Every dependency needs its own latency distribution, its own error rate split by class, its own timeout count, and its breaker state (Module 4, page 3) — all measured from the caller's side
- Caller-side is the point. The dependency's own dashboard shows what it did for everyone; only the caller's view shows what it did for this service, over this network path, under this timeout

| What the numbers show | What it means | Where to look |
|---|---|---|
| latency up, errors flat | the dependency is slow but serving; the queue is filling here | bulkheads (Module 4, page 4) |
| timeouts up, 5xx flat | the answer never arrives — saturated, deadlocked or dropped in transit | deadlines (Module 4, page 1) |
| 4xx up after a deploy | a contract change, not an outage — the caller is sending something new | contracts (Module 5, page 1) |
| breaker open | the dependency is down and calls are failing fast | fallbacks (Module 4, page 8) |

- Timeouts are counted separately from errors on purpose. An error is an answer; a timeout is the absence of one, and it costs a held connection, a held thread and a deadline that has already expired upstream. Folding them together hides the more expensive of the two
- Breaker state belongs on the dashboard as a metric, not only in the logs, because it is the one signal that says the service is currently protecting itself rather than failing

### The failure

- A service that degrades gracefully and never says so. Recommendations are down, the fallback returns an empty list, and the service reports `200` on every request with a perfect indicator while users see a blank shelf
- Graceful degradation removes the signal along with the failure. Anything that can be degraded needs a counter for how often it is being degraded, and that counter needs to be part of the indicator — otherwise the dashboard is measuring the fallback, and the fallback always works
