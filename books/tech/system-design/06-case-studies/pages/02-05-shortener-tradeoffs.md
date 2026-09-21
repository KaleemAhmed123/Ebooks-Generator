## What the interviewer probes

- **Click analytics without slowing the redirect.** The redirect touches the cache and returns. The click is recorded by appending an event (code, time, referrer, coarse geo) to a log and letting a consumer aggregate it (booklet 04). A synchronous `UPDATE clicks = clicks + 1` on the hot row is a write per read: 4 000 row locks a second on the same few rows, on the path with the 50 ms budget
- **Custom aliases.** `POST /urls { alias: "launch" }` is an insert with the alias as the code. Uniqueness is the primary key; a duplicate is a constraint violation returned as 409, not a read-then-insert race. Reserved words and a length floor stop `GET /login` from being someone's link
- **Expiry.** The read path returns 410 for an expired row (page 2). Removal is a sweep by `expires_at` in batches, off-peak, or partition-by-month and drop whole partitions. A sweep that scans 12 TB nightly is the wrong shape; an index on `expires_at` makes it a range scan
- **Abuse.** Shorteners hide phishing links. Rate-limit creates per user and per IP (Module 3), check the target against a blocklist at create time, and keep the ability to disable a code: which is one more reason the code, not the URL, is the key, and one reason the cache TTL is a day and not forever
- **Availability of the read path.** The cache is a replicated pair per region; a cache outage degrades to 4 000 reads a second on the replicas, which a relational store serves from a warm index. Say that the design survives losing the cache, and what its p99 becomes when it does
- **What changes at 10×.** 40 000 reads a second is still one cache tier; 400 writes a second is still one primary. The first thing that shards is the analytics log, not the URL table

### The failure

- Synchronous work on the redirect. Every "small" addition to `GET /{code}`, a counter, a geo lookup, a fraud check, lands on the path the p99 was promised for. The redirect does one cache read and replies; everything else consumes the click event afterwards
