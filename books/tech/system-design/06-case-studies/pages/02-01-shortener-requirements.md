## URL Shortener: Requirements and numbers

- The prompt "design a URL shortener like TinyURL" is the universal system design warm-up. It tests whether you can handle a massively read-heavy workload and understand caching
- The core requirements are taking a long URL and returning a short URL, and redirecting users when they click the short URL. The system must also support custom aliases and an optional expiry time
- For numbers, assume 100 million new URLs are generated per month. The read-to-write ratio is extreme: usually 100:1. That gives 10 billion clicks per month
- 100 million writes/month is ~40 QPS. 10 billion reads/month is ~4,000 QPS. The storage is small: if each row is roughly 1 KB, 100 million rows per month is 100 GB per month, or 12 TB over 10 years

| Metric | Calculation | Result |
| :--- | :--- | :--- |
| **Write QPS** | 100M / 30 / 100,000 | ~40 QPS |
| **Read QPS** | 40 QPS × 100 | ~4,000 QPS |
| **10-Year Storage** | 100M × 12 × 10 × 1 KB | ~12 TB |
| **Base-62 keyspace** | 62^7 combinations | 3.5 trillion keys |

### The failure

- The failure mode is sizing the database and architecture around the write path. A candidate sees 12 TB of storage and immediately proposes a complex sharded Cassandra cluster for writes
- 40 writes per second can be handled by a Raspberry Pi. The hard part of this system is the 4,000 reads per second (and the peaks that come when a link goes viral), not the storage size

:::interview
**The read-heavy test**
The interviewer is looking for you to explicitly acknowledge the 100:1 read-to-write ratio. If you do not state this out loud, your architecture will look like a generic CRUD app.
:::
