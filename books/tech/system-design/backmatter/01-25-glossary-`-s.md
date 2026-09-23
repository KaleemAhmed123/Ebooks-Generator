## Glossary: `–S

| Term | Means | Where |
|---|---|---|
| **`SKIP LOCKED`** | the SQL modifier leaving locked rows out of the result and returning the next free ones. How a job queue lives in SQL | 3 · 3-04 |
| **SLA** | the contract, with consequences for missing it | 1 · 1-05 |
| **slew** | correcting a clock by running it slightly fast or slow until it catches up, rather than stepping it | 3 · 9-02 |
| **SLI** | the measurement: what fraction of requests met the bar | 1 · 1-05 |
| **sliding log** | storing every request timestamp per key. Exact, and too expensive to run at scale | 5 · 10-04 |
| **SLO** | the target for an SLI, over a stated window | 1 · 1-05 |
| **sloppy quorum** | writing to the next healthy node when a home replica is down, with a hint naming the intended owner | 2 · 7-02 |
| **snapshot** | a consistent copy of the data at one log position, from which a replica or a consumer can start | 2 · 5-06 |
| **snapshot isolation** | every statement in a transaction seeing the database as it was when the transaction started | 3 · 2-04 |
| **Snowflake id** | a 64-bit time-ordered id laid out as a millisecond timestamp, a machine number, and a per-millisecond sequence | 6 · 6-03 |
| **soft dependency** | one you can do without, badly | 1 · 2-04 |
| **sorted set** | a Redis structure keeping members ordered by a numeric score, with logarithmic updates and range reads | 6 · 17-02 |
| **span** | one unit of work inside a trace, with a start, a duration and a parent | 5 · 6-06 |
