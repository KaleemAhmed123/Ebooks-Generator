## Exactly-once is a lie

- If At-most-once drops data, and At-least-once duplicates data, why don't we just use Exactly-once?
- Because **Exactly-once delivery over a network is mathematically impossible**. You cannot guarantee that two distinct systems (your application and the broker) will perfectly agree on state over an unreliable network (the Two Generals' Problem).

| Mechanism | Reality |
|---|---|
| **TCP Guarantees** | TCP guarantees ordered, lossless delivery *if the connection stays open*. If the socket closes mid-flight, TCP cannot tell you if the payload was received. |
| **Kafka Transactions** | Kafka offers "Exactly Once Semantics" (EOS). But this *only* applies to "consume-transform-produce" loops entirely within Kafka (e.g., Kafka Streams). It cannot protect your Postgres database from duplicates. |
| **Idempotent Producer** | Prevents producer retries from creating duplicates in the broker. Does not stop the consumer from reading a message twice. |

### The failure

- Paying massive performance penalties for Kafka Transactions when you actually needed idempotence. Developers read Kafka marketing material about EOS and enable Transactions. This adds significant latency and overhead to the cluster. But they are consuming messages and writing the result to an external MySQL database. If the consumer crashes after writing to MySQL but before committing the transaction to Kafka, the message *will still be redelivered*, and MySQL *will still receive a duplicate write*. Transactions do not magically solve the network gap between Kafka and your database
