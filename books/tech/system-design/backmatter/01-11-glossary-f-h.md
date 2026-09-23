## Glossary: F–H

| Term | Means | Where |
|---|---|---|
| **full jitter** | picking the backoff delay at random between zero and the exponential value, rather than sleeping exactly that long | 1 · 9-05 |
| **functional requirements** | what the system does — and, graded just as highly, what it deliberately does not | 6 · 1-03 |
| **gauge** | a metric that is a value now, which may go up or down | 6 · 15-02 |
| **GIN** | an inverted index over the elements inside a value, for arrays, `jsonb` and full-text search | 2 · 3-05 |
| **global secondary index** | an index partitioned by the indexed value rather than by the row, so a lookup reads one partition and a write may cross two | 2 · 8-13 |
| **graceful degradation** | deciding per feature what "worse but up" looks like, before the dependency is down | 5 · 4-07 |
| **graph database** | a store holding relationships natively, for multi-hop traversals | 2 · 9-03 |
| **gray failure** | unhealthy from the user's view and healthy from the monitor's | 1 · 6-06 |
| **gRPC** | a synchronous call style where a `.proto` file defines the service, both sides are generated from it, and Protocol Buffers travel over HTTP/2 | 5 · 3-02 |
| **half-open socket** | one end believing the connection is open after the other has gone. Silence is not a signal | 1 · 8-07 |
| **hard dependency** | one a request cannot complete without, so its availability multiplies into yours | 1 · 2-04 |
| **hash partitioning** | partitioning on the hash of the key, turning any distribution of keys into an even spread | 2 · 8-03 |
| **head-of-line blocking** | one lost packet, or one slow item, stalling everything queued behind it | 1 · 6-04 |
