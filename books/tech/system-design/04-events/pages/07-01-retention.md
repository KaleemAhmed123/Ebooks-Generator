# Module 7 - Retention, replay, compaction

## Retention

- A log deletes nothing on read (Module 2, page 3), so something deletes by policy. **Retention** is that policy: how long, or how many bytes, a partition keeps before its oldest segments are removed

| Setting | Default | Meaning |
|---|---|---|
| Kafka `retention.ms` | 604,800,000 (7 days) | delete segments older than this |
| Kafka `retention.bytes` | −1 (no limit) | per partition; delete oldest when over |
| Kafka `offsets.retention.minutes` | 10,080 (7 days) | a group with no members for this long loses its committed offsets |
| SQS message retention | 4 days; 60 s to 14 days | a message not deleted by then is discarded |
| Kafka `auto.offset.reset` | `latest` | where a consumer with no valid offset starts: `earliest`, `latest`, `by_duration`, or `none` (error) |

- Retention is the second consumer contract after ordering. It says how long a reader may be away. A consumer whose downtime, plus its drain time (Module 6, page 6), exceeds it has lost data the moment it comes back
- Long retention is possible: tiered storage moves old segments to object storage, and "keep everything" is a storage bill plus a replay-time bill. It is not free of the question; it only moves the deadline
- The choice is: the longest outage you will recover from without a manual replay from the source system, plus margin

### The failure

- A consumer down longer than retention. It restarts, its committed offset points into deleted segments, and it silently starts at `latest`: eight days of records skipped, no error, lag reads zero. `auto.offset.reset=none` turns that into a crash on start, which is the outcome you want. And a group idle for a week loses its offset entirely, even if the data is still there
