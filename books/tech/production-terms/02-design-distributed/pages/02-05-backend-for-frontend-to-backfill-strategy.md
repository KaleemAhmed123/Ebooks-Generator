## Backend for Frontend

A gateway per client type, so a mobile app is not forced to consume an API
shaped for a web dashboard.

The web view needs forty fields; the mobile view needs six and is on a train.
One shared endpoint over-fetches badly for mobile, and every attempt to fix that
for mobile makes the web response worse.

Each BFF owns its own aggregation shape and can change it without asking anyone.
The cost is a second deployable to run and the discipline to keep business logic
out of it — a BFF that starts making decisions has become a service.

## Backfill Strategy

Populating a new column or a new system with historical data without taking
production down. Volume is what makes the obvious approach impossible.

One `UPDATE` across 80M rows takes a lock, floods the write-ahead log, and
pushes replica lag into the minutes. Batches of five thousand with a pause take
hours and hurt nobody.

```sql
-- resumable: track the last id, restart from there
UPDATE ... WHERE id > :last_id ORDER BY id LIMIT 5000;
-- then: commit, sleep, and pause entirely if replica lag > 5s
```

Four properties make a backfill safe: it is batched, it is throttled on replica
lag, it is resumable from a recorded position, and its progress is visible
somewhere other than the terminal it was started in.
