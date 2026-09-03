## Change Streams

Subscribing to a collection's oplog to react to inserts, updates and deletes as
they happen, with a resume token to survive a disconnect.

A search index stays in sync by tailing a change stream instead of polling every
thirty seconds.

**Store the resume token.** Without it, a reconnect either replays events you
already handled or skips the ones that happened while you were gone, and which
of those you get is a matter of timing.

## Competing Consumers

Several workers on one queue, each message going to exactly one of them. The
standard way to scale throughput sideways.

One consumer clears 200 documents a minute; four clear 800. The work divides
because no message is delivered twice.

**Autoscale on queue depth or message age, not CPU.** Depth is what reflects
user-visible lag — workers can sit at 30% CPU while a queue builds for an hour,
and a CPU-based rule will never notice.

## Composite Index Order

Column order in a multi-column index decides which queries it can serve. The
rule is that only a leftmost prefix counts.

An index on `(tenant_id, created_at)` serves "this tenant, newest first"
perfectly and does nothing at all for "everything, newest first".

Filtering on `tenant_id` uses it. Filtering on `tenant_id` and ordering by
`created_at` uses it and skips the sort. Filtering on `created_at` alone cannot
use it at all — there is no leftmost prefix to match.

Two indexes over the same columns in a different order are two different
indexes. The duplicate you were about to drop may be the only one serving a
query.
