## Log Volume Cost

Logs are billed at least three times: to ingest, to retain, and again per query.
The rates differ by two orders of magnitude, so the same log line costs wildly
different amounts depending on which stage it survives to.

| Stage | CloudWatch Logs, us-east-1, 2026 |
|---|---|
| ingest, Standard class | $0.50 per GB |
| ingest, Infrequent Access class | $0.25 per GB |
| storage after ingest | $0.03 per GB-month |
| Logs Insights query | $0.005 per GB scanned |

**Ingest dominates, and ingest is priced on bytes nobody ever reads.** One debug
line added to a hot path becomes a permanent per-request tax. Sampling at the
emitter is the control that works; shortening retention only touches the $0.03
column.

## Microbenchmark Trap

Measuring code the compiler already removed. Two failures dominate: dead-code
elimination, where an unused result lets the whole computation be optimised
away, and constant folding, where a fixed input lets the compiler compute the
answer once, outside the loop.

JMH names both and handles both — return the result or pass it to a `Blackhole`,
and read inputs from non-final `@State` fields rather than constants.

**A suspiciously good number is the symptom, and almost nobody treats it as
one.** A loop reporting sub-nanosecond iterations is not fast. It is not
running.
