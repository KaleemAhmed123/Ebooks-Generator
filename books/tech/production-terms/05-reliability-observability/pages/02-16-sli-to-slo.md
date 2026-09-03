## SLI

*Service Level Indicator*

The actual measurement an objective is defined on. Vague SLOs fail because
nobody agreed on the indicator underneath them.

"The API is fast" is not an SLI. This is:

| Part | Definition |
|---|---|
| good events | status 2xx **and** latency under 400ms |
| valid events | all `GET /search`, health checks excluded |
| measured at | the load balancer, one-minute buckets |
| SLI | good ÷ valid |

Move the measurement point and the number moves with it. An SLI measured inside
the application counts no request that never reached the application — which is
precisely the outage it was bought to catch.

## Sliding Window Counter

Rate limiting that closes the boundary bug in fixed windows, where a client
legally takes twice the limit across a reset line.

A fixed window of 100 a minute permits 100 requests at 11:59:59 and 100 more at
12:00:01 — 200 in two seconds, both inside the rules. A sliding window weights
the previous window into the current count, `prev × 0.9 + curr`, and rejects the
second burst.

The weighting assumes the previous window's traffic was evenly spread. It was
not, so the count is an estimate. It is close enough for a limiter and wrong for
billing.

## SLO

*Service Level Objective*

Your internal target, always stricter than the contractual SLA. The SLA is the
floor. The SLO is where you aim so you never reach the floor.

The SLA promises customers 99.9%. The team's SLO is 99.95%. The gap is the
safety buffer, and it is the whole reason for having two numbers. Aim exactly at
the SLA and you will breach it regularly, because a target is where you land in
a good quarter, not a bad one.
