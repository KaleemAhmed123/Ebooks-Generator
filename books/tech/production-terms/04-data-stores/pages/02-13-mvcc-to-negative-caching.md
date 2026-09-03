## MVCC

*multi-version concurrency control*

Postgres keeps old row versions, so readers never block writers and writers
never block readers. The cost is dead tuples that have to be vacuumed away.

A long analytics query holds a snapshot for forty minutes. Every row updated
during that window keeps its previous version alive, and the table physically
grows the whole time.

**An `UPDATE` writes a new row version rather than modifying one in place.** That
one fact explains bloat, why vacuum exists, and why a long-running read on a
busy table is an operational event and not just a slow query.

## N+1 Query

Fetching a list, then issuing one query per item in it. The most common ORM
performance bug there is.

Loading fifty posts and then each post's author is fifty-one queries and 380ms.
One join, or one `include`, is a single query and 12ms.

It never appears in development, because fifty rows against a local database is
fast enough that nobody looks. It appears in production as an endpoint that is
mysteriously slow in proportion to how much data the user has.

Three fixes, in order of how much they change: a join, a single `IN (...)`
lookup, or a batching loader if the call sites are scattered.

## Negative Caching

Caching the fact that something does not exist, so repeated lookups for missing
keys stop reaching the database.

A scraper requests forty thousand non-existent product IDs. Without negative
caching every one is a database miss. With a sixty-second null marker, 39,900 of
them never leave Redis.

Absence is the case people forget to cache, and it is the case an attacker or a
badly written client will generate in volume — precisely because it is free for
them and expensive for you.

**Keep the TTL short.** A newly created record hidden behind a ten-minute null
marker looks like a bug in the write path, and that is where people will go
looking.
