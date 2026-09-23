## Glossary: S–T

| Term | Means | Where |
|---|---|---|
| **storage engine** | the part of a database that lays bytes out on disk and finds them again | 2 · 2-01 |
| **strangler fig** | replacing a system by routing one behaviour at a time to the new one, until nothing reaches the old | 5 · 5-05 |
| **stream processor** | something that reads a stream continuously, keeps state as it goes, and emits results as they become available | 4 · 12-01 |
| **stream-stream join** | joining two streams within a time window, because neither side is ever done | 4 · 12-06 |
| **stream-table duality** | a stream is a table's changelog; a table is a stream folded to the latest value per key | 4 · 7-04 |
| **stream-table join** | enriching each event with the latest value from a table | 4 · 12-06 |
| **strict serializability** | serializable, and the serial order respects real time | 3 · 5-03 |
| **structured log** | one JSON object per event with stable keys, so everything that varies is a field | 5 · 6-02 |
| **subscription** | a named queue of its own attached to a topic, holding that reader's copies | 4 · 2-02 |
| **synchronous replication** | the leader waits for a follower to hold the write before acknowledging it | 2 · 5-04 |
| **table partitioning** | splitting one logical table into smaller physical tables, by range, list or hash | 2 · 3-06 |
| **tail sampling** | buffering a trace's spans until it finishes, then keeping it on what it turned out to be | 5 · 6-06 |
| **throttling** | the server deliberately shedding load, signalled with 429 or 503 | 1 · 9-01 |
