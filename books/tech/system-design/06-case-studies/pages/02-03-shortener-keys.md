## Generating the short code

- A 7-character string using base-62 (a–z, A–Z, 0–9) gives 62^7 combinations, which is roughly 3.5 trillion keys. This is plenty for a system generating 100 million links a month
- The hard part is ensuring no two long URLs receive the same short code. There are three approaches: hashing, a distributed counter, or a pre-generated key table
- **Hashing:** Run the long URL through MD5 or SHA-256 and take the first 7 characters. **The problem:** MD5 outputs 32 hex characters. If you truncate it to 7, you will inevitably hit collisions. Resolving collisions requires reading the database, appending a salt, and rehashing. This is slow
- **Distributed Counter:** Use a distributed ID generator (like Snowflake, or a Redis counter, as covered in Booklet 05) to get a unique integer, then convert that integer to base-62. **The problem:** It is perfectly predictable. Competitors can scrape your links and deduce exactly how many URLs you generate per day
- **Pre-generated Key Table:** A background worker generates random 7-character base-62 strings and stores them in a "keys" database. When a request comes in, it pops an unused key. **The advantage:** Fast, collision-free at write time, and unpredictable

| Approach | Pros | Cons |
| :--- | :--- | :--- |
| **Hash (MD5 truncated)** | Deterministic | Collisions are guaranteed at scale; resolving them is expensive |
| **Counter + Base62** | Guaranteed unique, no DB required for key | Sequential keys leak business metrics |
| **Pre-generated Table** | O(1) fetch, no collisions on write | Requires a background worker and separate key storage |

### The failure

- The failure mode is proposing the truncated hash approach without acknowledging collisions. If you truncate a hash, the pigeonhole principle guarantees collisions
- The interviewer will ask, "What happens when it collides?" If your answer is "re-hash until it works," they will point out that as the database fills up, the write latency will degrade exponentially

:::interview
**The predictability test**
If you choose the counter approach, the interviewer will ask about security. Sequential IDs allow anyone to scrape the entire dataset by iterating `0001`, `0002`, `0003`.
:::
