# Module 2 - URL shortener

## Requirements and numbers

- The warm-up prompt. It is asked because it looks trivial and is not: the whole design is one read-heavy path, and the grade is whether the candidate notices
- Functional, three in: `POST` a long URL and get a short code back; `GET /{code}` redirects to the long URL; codes may expire. Out, named: custom aliases and click analytics (page 5), login, link preview
- Non-functional, as numbers: redirect p99 under 50 ms from the service; 99.99 % available on the read path; a code, once issued, resolves to one URL for its whole life
- Inputs, stated as assumptions: say 100 M new URLs a month, 100 reads per write, rows of about 1 KB (code, URL up to 2 KB, owner, timestamps)

| Quantity | Arithmetic (Module 1, page 4) | Result |
| :--- | :--- | :--- |
| write rate | 100 M ÷ 30 ÷ 100 000 | ≈ 40 per second |
| read rate | 40 × 100 | ≈ 4 000 per second, peaks of 20 000 |
| storage, 10 years | 100 M × 12 × 10 × 1 KB | ≈ 12 TB |
| key space, 7 chars base-62 | 62⁷ | ≈ 3.5 × 10¹² codes: about 2 900 years at 100 M a month |

- Two of those numbers decide the design. 4 000 reads a second with a tiny working set is a cache in front of the store (page 4). 40 writes a second is nothing; the write path's only problem is key uniqueness (page 3)
- 12 TB rules out one machine's memory, not one machine's disk. A single primary with replicas holds it; sharding is a later answer to a later number

### The failure

- Sizing for the write path. The candidate sees 12 TB, proposes a sharded wide-column cluster for writes, and never says the phrase "100 to 1". Forty writes a second fit on a laptop. The interviewer is waiting to hear which path is hot and what its p99 budget buys
