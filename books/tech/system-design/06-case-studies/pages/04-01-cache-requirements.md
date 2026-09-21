# Module 4 - Distributed cache

## Requirements and numbers

- "Design a distributed cache" or "design a distributed LRU cache" is reported at Google, Stripe and Walmart. It is a memory problem first: what fits, what gets evicted, and what happens to the database when the cache is wrong or gone
- Functional, three in: `get(key)`, `set(key, value, ttl)`, `delete(key)`; keys spread over many nodes; a node can be added or removed. Out: transactions across keys, persistence, secondary indexes, anything that makes it a database
- Non-functional: p99 read under 1 ms inside the data centre; a target hit ratio, stated as a number; losing one node loses that node's share of the keys and nothing else
- Inputs, as assumptions: say 2 TB of hot data, values averaging 1 KB, 500 000 reads a second, 64 GB usable memory per node

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| nodes | 2 TB ÷ 64 GB | 32 primaries at full memory, ≈ 42 with a third of headroom; pages 2 and 6 use 32. Replicas double it if the miss storm on page 6 must be survived |
| reads per node | 500 000 ÷ 32 | ≈ 16 000/s, well inside one node |
| misses at 99 % hit | 500 000 × 1 % | 5 000 reads/s reach the database |
| misses at 90 % hit | 500 000 × 10 % | 50 000/s: the database is now sized by the cache's misses |

- The hit ratio is the requirement everything else serves. 99 % and 90 % differ by 10× in database load; the eviction policy (page 3) and the TTL (page 5) are chosen to hit the number, and the number is watched in production (`hits / (hits + misses)`), because a cache cannot be seen to work any other way
- A miss costs more than a hit saves: one cache round trip, then the database, then a cache write. Below roughly 50 % hit the cache is adding latency, not removing it

### The failure

- A cache with no hit-ratio target. "We add Redis in front" and nothing is sized: not the memory, not the eviction policy, not the database behind it. When the interviewer asks "how do you know it is working?", the only answer is the number this page was for
