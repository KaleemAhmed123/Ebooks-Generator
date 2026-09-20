## Read-through and write-through

- In Cache-Aside, the application talks to both the cache and the database. In Read-Through and Write-Through, the application *only* talks to the cache. The cache itself is responsible for talking to the database

| Pattern | How it works | When to use it |
|---|---|---|
| **Read-Through** | App asks cache. Cache misses, cache reads DB, cache returns to app. | When you want simple app code. Often provided by ORMs (like Hibernate) or specialized data layers |
| **Write-Through** | App writes to cache. Cache pauses, writes synchronously to DB, then returns success to app. | When you have a read-heavy system and you want absolute consistency between cache and DB |

- In both patterns, the cache sits "in front" of the database as a mandatory layer

### The failure

- The failure is using Write-Through for data that nobody reads. Because a Write-Through cache waits for the database to confirm the write before returning to the application, every single write pays the latency penalty of both a cache write and a database write
- If you are writing IoT sensor data or logging user clicks, and 99% of that data is never read again, Write-Through forces you to pay latency to warm a cache that will never be used. Use Cache-Aside instead, so the cache is only populated on the first read
