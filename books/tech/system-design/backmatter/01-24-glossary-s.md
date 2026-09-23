## Glossary: S

| Term | Means | Where |
|---|---|---|
| **sequential consistency** | one total order of all operations that respects each client's own order, but not real time between clients | 3 · 5-06 |
| **serializable** | the isolation level whose result equals some one-at-a-time order of the transactions | 3 · 1-04 |
| **series** | a metric name plus a set of label pairs | 6 · 15-02 |
| **service mesh** | a proxy beside every instance handling discovery, mutual TLS, retries and timeouts, so the application talks to `localhost` | 5 · 3-09 |
| **service registry** | the service that knows the current set of healthy instances | 5 · 3-07 |
| **session affinity** | sending every request from one client back to the instance that served the first | 5 · 7-06 |
| **sharding** | splitting the data across machines | 1 · 5-05 |
| **share group** | a Kafka consumer style giving queue semantics on a topic, so more readers than partitions can share the work | 4 · 2-06 |
| **siblings** | concurrent values kept side by side for the application to merge | 2 · 6-06 |
| **sidecar** | the proxy a service mesh puts beside each instance | 5 · 3-09 |
| **single-writer principle** | exactly one service may change any given piece of data, and that service is the source of truth | 5 · 2-04 |
| **site reliability engineering (SRE)** | Google's name for running production, and the practices that came with it | 1 · 1-05 |
| **size-tiered compaction** | merging files of similar size into a bigger one. Cheapest on writes, expensive in space during the merge | 2 · 2-08 |
