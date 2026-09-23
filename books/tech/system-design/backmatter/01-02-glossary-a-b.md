## Glossary: A–B

| Term | Means | Where |
|---|---|---|
| **API gateway** | the single address the outside world calls, doing TLS termination, authentication, rate limiting and routing once for every service behind it | 5 · 3-05 |
| **asynchronous replication** | the leader acknowledges a write before any follower holds it; fastest, and the window of loss is the **replication lag** | 2 · 5-04 |
| **at-least-once delivery** | retry until acknowledged; the message may arrive more than once | 1 · 7-05 |
| **at-most-once delivery** | send and forget; the message may be lost | 1 · 7-05 |
| **atomicity** | if a transaction cannot finish, every write it made is undone. The mechanism is the abort | 3 · 1-02 |
| **availability** | the fraction of time, or of requests, for which the system honours its promise, quoted in nines | 1 · 2-01 |
| **backend for frontend (BFF)** | a backend owned by one frontend team, shaping the services' answers into what that experience's screens need | 5 · 3-06 |
| **backfill** | copying history into a new layout in batches, without overwriting what the live path has already written | 2 · 8-18 |
| **backpressure** | the consumer telling the producer how much it can take, so an unbounded buffer never becomes a delayed crash | 4 · 6-05 |
| **backward compatible** | an old caller still works against the new service | 5 · 5-02 |
| **ballot number** | the unique, increasing number identifying a Paxos proposal | 3 · 7-09 |
| **base-62** | a change of number base that fits any integer under 3.5 × 10¹² into seven URL-safe characters | 6 · 2-03 |
| **binding (AMQP)** | the rule deciding which queues get a copy of a message published to an **exchange** | 4 · 2-04 |
