## DataLoader Batching

Collecting individual per-item lookups made within one tick and issuing them as
a single query. The standard fix for GraphQL's N+1 problem.

A query resolving fifty posts, each of which fetches an author, issues
fifty-one queries. A loader collapses the fifty author lookups into one
`WHERE id IN (...)` and hands each resolver its own row back.

The batch function must return rows **in the order the IDs were asked for**, not
the order the database returned them. Getting that wrong gives every post the
wrong author — silently, and only on the requests where the row order happened
to differ.

## Denormalisation

Deliberately duplicating data to avoid a join on a hot read path. You trade
write complexity and a consistency risk for read speed.

A feed query joining five tables takes 400ms; a precomputed row takes 8ms. From
that moment every author renaming themselves has to fan out across every row
that copied their name.

Denormalise for a read problem you have measured. Denormalising pre-emptively
buys the drift and the fan-out cost without buying the speed, because the join
was never the slow part.

## Distributed ID Generation

Generating unique IDs across many nodes without coordination. The choice matters
because random IDs destroy index locality and time-ordered ones preserve it.

| | Ordering | Coordination | Index behaviour |
|---|---|---|---|
| Auto-increment | perfect | needs a single writer | append-only, ideal |
| UUIDv4 | none | none | every insert hits a random page |
| UUIDv7 / ULID / Snowflake | time-ordered | none | appends at the right edge |

A random UUID as a primary key on a high-insert table scatters writes across the
whole B-tree, which inflates the index and the write amplification with it.
Time-prefixed IDs keep inserts at the right edge, which is where they are cheap.
