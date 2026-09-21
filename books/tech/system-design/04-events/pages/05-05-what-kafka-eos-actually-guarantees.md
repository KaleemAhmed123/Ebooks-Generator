## What Kafka EOS actually guarantees

- Kafka's docs: exactly-once is supported in Kafka Streams, and by the transactional producer with a `read_committed` consumer when reading, processing and writing on Kafka topics; other destination systems "generally require cooperation". The boundary is the topic

| Covered | Not covered |
|---|---|
| read from a topic, process, write to topics: once, atomically with the offset | a database write inside the loop |
| Kafka Streams with `processing.guarantee=exactly_once_v2` (default `at_least_once`) | an HTTP call, an email, a file |
| the producer's own retries (page 3) | the application re-sending after a restart (page 3) |
| readers at `read_committed` | readers at `read_uncommitted` (page 4) |

- The right-hand column is every real side effect. Kafka cannot roll back a Postgres row or an email that left. Its answer is page 6: store the offset where the output goes. "Effectively once" is the honest name for the system property: at-least-once, plus a dedup at each boundary

:::interview
"Does Kafka give exactly-once?" — Inside Kafka, yes: a transactional producer writes outputs and the input offset atomically, and `read_committed` readers see all or nothing; Kafka Streams packages that as `exactly_once_v2`. At the edge, no: a database or an API call is outside the transaction, so the consumer must make its own write idempotent or commit the offset in the same database transaction as the effect.
:::

### The failure

- Transactions turned on for a consumer that writes to MySQL. The consumer crashes after the MySQL write and before the Kafka commit; the record is redelivered; MySQL gets the row twice. The transaction kept its promise on the side of the boundary where nothing needed it
