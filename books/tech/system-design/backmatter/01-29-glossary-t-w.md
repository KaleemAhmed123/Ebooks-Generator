## Glossary: T–W

| Term | Means | Where |
|---|---|---|
| **two-phase locking (2PL)** | acquiring locks in a growing phase and releasing them in a shrinking phase, which yields serializability | 3 · 3-06 |
| **upcasting** | a translation layer reading old-shape events and handing consumers the new shape | 4 · 11-07 |
| **utilisation** | the fraction of capacity in use. Response time rises as one over one minus it | 1 · 3-06 |
| **validity** | the consensus safety property: the decided value was proposed by someone | 3 · 7-01 |
| **varint** | a variable-length integer, where small values take one byte | 2 · 4-03 |
| **version vector** | a list of per-replica counters carried with a value, which can tell concurrent writes from ordered ones | 2 · 6-06 |
| **vertical scaling** | replacing the machine with a bigger one | 1 · 3-01 |
| **virtual nodes** | giving each physical node many points on the hash ring rather than one, so load evens out | 2 · 8-06 |
| **visibility map** | the Postgres bitmap marking heap pages where every row is visible to everyone. What makes an index-only scan possible | 2 · 3-04 |
| **visibility timeout** | how long a queue hides a received message from other consumers before it reappears | 4 · 3-07 |
| **waiting room** | an edge component turning simultaneous arrivals into a rate the flow behind it can take | 6 · 12-04 |
| **watermark** | a claim that event time has reached a given point in a stream, so windows before it may close | 4 · 12-04 |
| **webhook** | an HTTP `POST` from a third party to a URL you registered, carrying a result that arrives out of band | 6 · 11-04 |
