## Glossary: T

| Term | Means | Where |
|---|---|---|
| **tied request** | sending to two servers and having whichever starts executing first cancel the other | 1 · 4-06 |
| **time-of-day clock** | milliseconds since 1970, set from NTP and therefore able to jump forwards or backwards | 3 · 9-01 |
| **token bucket** | a counter refilling at a fixed rate up to a cap, so a burst is allowed up to the cap and the long-run rate is the refill | 1 · 9-06 |
| **tolerant reader** | one that ignores fields it does not recognise, rather than rejecting the message | 5 · 5-02 |
| **tombstone** | a marker recording that a key is deleted, because an append-only engine cannot remove anything | 2 · 2-09 |
| **topic** | the named stream a producer writes to, made of partitions | 4 · 2-02 |
| **trace** | one request's whole journey, assembled from its spans | 5 · 6-06 |
| **transaction** | a group of writes with exactly two outcomes: all took effect, or none did | 3 · 1-01 |
| **trie** | a tree with one node per prefix, so every node's subtree is everything starting with it | 6 · 13-02 |
| **TTL (time to live)** | how long a cached or stored value stays valid before it expires | 1 · 6-02 |
| **tumbling window** | a fixed, non-overlapping interval, to which each record belongs exactly once | 6 · 16-03 |
| **two generals problem** | two parties cannot reach certain agreement over an unreliable channel, however many messages they send | 1 · 7-05 |
| **two-phase commit (2PC)** | a coordinator asking every participant to prepare, then telling them all to commit or abort | 3 · 4-02 |
