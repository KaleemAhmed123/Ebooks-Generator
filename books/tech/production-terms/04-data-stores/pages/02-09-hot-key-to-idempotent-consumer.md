## Hot Key

One key taking a disproportionate share of traffic, saturating a single shard or
a single-threaded core while the rest of the cluster idles.

A homepage config key served 80,000 requests a second from one shard. Adding
shards did nothing, because the key still hashed to the same one.

Two fixes, and they compose: a short-TTL in-process cache in front of Redis so
most reads never leave the application, and key sharding — `key:{0..9}` written
to all and read from one at random — when the value genuinely must be fresh.

## Idempotent Consumer

A consumer that can process the same message twice with no additional effect.
Not optional — at-least-once is what delivery actually gives you.

The standard shape is a table of processed message IDs with a unique constraint.
Insert the ID before doing the work; if the insert conflicts, the message has
already been handled, so acknowledge and move on.

No double charge, no duplicate email, and no need to reason about whether a
redelivery is possible. It is.

**Do the insert and the work in one transaction**, or a crash between them
leaves a message marked processed that never was.
