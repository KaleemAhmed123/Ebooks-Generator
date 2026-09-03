## MTTR / MTBF

*Mean time to recovery / mean time between failures*

MTTR is how fast you recover. MTBF is how rarely you break. Mature teams push
harder on MTTR, because not all failure is preventable.

| Team | MTBF | MTTR | Availability |
|---|---|---|---|
| A | 90 days | 6 hours | 99.72% |
| B | 7 days | 4 minutes | 99.96% |

Team B fails thirteen times more often and is measurably more available.
Optimising for a low incident count instead pushes a team to stop deploying,
which is the single change that makes recovery slow.

## P50 / P95 / P99.9

*Percentile ladder*

Different percentiles answer different questions.

| Percentile | Who it is | What it drives |
|---|---|---|
| P50 | the typical user | product feel |
| P95 | the unhappy tail | the SLO target |
| P99 | the worst 1% | churn signal |
| P99.9 | your largest account | escalation |

A dashboard alerting on P50 stayed green for six weeks while P99 tripled. The
retry storm underneath it was only visible above P95.

## Rate Limiting

Capping how many requests one caller may make in a window, so a single client
cannot starve everyone else.

A key is allowed 100 requests a minute. Request 101 gets a 429 and a
`Retry-After: 23` header. The database never sees the flood.

A 429 without `Retry-After` teaches clients to retry immediately, which is the
traffic you were limiting. Return the number, and meter the rejections — an
unmetered limiter is a silent outage for one customer.
