## Glossary: E–F

| Term | Means | Where |
|---|---|---|
| **etcd** | the Raft-based key-value store Kubernetes keeps all its cluster objects in | 3 · 7-11 |
| **event-carried state transfer** | a fat event carrying the changed data itself, so the consumer need not call back | 4 · 11-02 |
| **event loop** | the single thread on which a Node process runs every callback. A blocking wait stops all of them | 1 · 6-03 |
| **event notification** | a thin event saying only that something changed, leaving the consumer to go and ask | 4 · 11-02 |
| **event sourcing** | storing every change to an aggregate as an ordered event and rebuilding state by folding them, never by reading a stored current row | 4 · 9-02 |
| **event storming** | writing every domain event in time order on a wall, then the command that caused each, to find where the boundaries fall | 5 · 2-02 |
| **event time** | when something happened, as opposed to when this system saw it | 4 · 12-02 |
| **eventually consistent** | if writes stop, replicas converge. Nothing is promised about what a read returns before then | 3 · 5-10 |
| **exactly-once delivery** | one arrival whatever fails — impossible over an unreliable network, by the **two generals problem** | 1 · 7-05 |
| **exchange (AMQP)** | the RabbitMQ object a producer writes to; bindings decide which queues get a copy | 4 · 2-04 |
| **expand, migrate, contract** | the three-deploy schema change: add the new column, backfill it, then stop writing the old one | 2 · 4-08 |
| **fail-closed** | refusing everything when the limiter's store cannot answer. Right only where an over-admitted request costs real money | 6 · 3-05 |
| **fail-open** | admitting everything when the limiter's store cannot answer. The default for a public API | 6 · 3-05 |
