## What the interviewer probes

- **Analytics without slowing the redirect:** The read path must be blindingly fast. If you do a synchronous database write to increment a click counter before returning the 302, you will fail the latency requirement. The solution is async processing (covered in Booklet 04): fire an event to a Kafka topic, or append to a fast log, and let a background worker update the analytics tables
- **Custom aliases:** Users want to specify their own links (e.g., `tinyurl.com/system-design`). This breaks the pre-generated key table. You must insert custom aliases directly into the database and handle unique constraint violations
- **Link expiry and cleanup:** If links expire, how do you clean them up? A background cron job that scans the whole table is too slow for 12 TB. A better approach is lazy evaluation: delete the row only when a user tries to access it and the server notices the timestamp has passed. (For bulk cleanup, use database partitioning by month and drop old partitions)
- **Abuse and rate limiting:** URL shorteners are heavily used for phishing and spam. The system needs a rate limiter (the next case study) to prevent a single IP from generating 100,000 links a minute, and a way to block malicious domains

### The failure

- The failure mode is doing synchronous analytics writes on the critical read path. A database write takes 5 to 20 milliseconds. At 4,000 QPS, synchronous writes will exhaust your connection pool and bring the system down
- The redirect path should ideally touch nothing but a fast in-memory cache. Everything else—analytics, abuse tracking, geolocation lookups—must happen asynchronously

:::interview
**The critical path test**
Every time you add logic to an endpoint, the interviewer asks: "Is this on the critical path?" If it can be done asynchronously, get it off the critical path.
:::
