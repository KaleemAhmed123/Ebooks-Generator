## Glossary: H–I

| Term | Means | Where |
|---|---|---|
| **head sampling** | deciding at the edge whether to keep a trace, before anything about the request is known | 5 · 6-06 |
| **hedged request** | a second copy of a request sent to another replica once the first passes its expected latency, the first reply winning | 5 · 4-06 |
| **hinted handoff** | a stand-in node holding a write for an absent owner and delivering it when the owner returns | 2 · 7-02 |
| **histogram** | a metric that is a counter per bucket, so one with twelve buckets costs twelve series per label set | 6 · 15-02 |
| **home leader** | routing every write for one record to the region that owns it, so multi-leader never conflicts on that record | 2 · 6-02 |
| **hopping window** | a fixed-size window that overlaps its neighbours | 4 · 12-03 |
| **horizontal scaling** | adding more machines of the same size and spreading the work across them | 1 · 3-02 |
| **hot partition** | the partition owning a key whose traffic exceeds what one partition can serve | 2 · 8-10 |
| **HOT update** | a Postgres update skipping the index writes when no indexed column changed and the page has room | 2 · 2-04 |
| **HTTP/2** | many requests multiplexed as streams over one TCP connection, where a lost packet stalls every stream | 1 · 6-04 |
| **HTTP/3** | HTTP over QUIC, where each stream recovers independently and a lost packet stalls only its own | 1 · 6-04 |
| **hybrid logical clock (HLC)** | a Lamport clock kept close to wall time, so timestamps order causally and still mean something to a human | 3 · 9-05 |
| **idempotency** | applying an operation more than once has the same effect as applying it once | 1 · 7-02 |
