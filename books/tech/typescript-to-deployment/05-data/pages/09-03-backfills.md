## Backfills

- A migration changes the shape. A **backfill** fills the new shape with data derived from the old one
- Running it as a single `UPDATE` over 80 million rows holds one enormous transaction, blows up the write-ahead log, and blocks other writes until it finishes or dies
- Doing it in batches turns one huge transaction into thousands of small ones, none of which hold anything for long

```ts
let cursor = ""

for (;;) {
  const rows = await db.$queryRaw`
    SELECT id, total FROM orders
    WHERE id > ${cursor} AND total_paise IS NULL
    ORDER BY id LIMIT 1000
  `
  if (rows.length === 0) break

  await db.$executeRaw`
    UPDATE orders SET total_paise = ROUND(total * 100)
    WHERE id = ANY(${rows.map((r) => r.id)})
  `

  cursor = rows.at(-1).id
  await sleep(50)          // leave room for real traffic
}
```

### What makes it survivable

- **Resumable.** The cursor plus the `IS NULL` filter means a crash restarts where it stopped, not from the beginning
- **Throttled.** A short sleep between batches keeps replication lag and CPU under control
- **Observable.** Log progress. A backfill with no progress output is indistinguishable from a hung one
- **Idempotent.** Running it twice must be harmless, because it will be run twice
- **Run it as a job, not a migration.** A migration that takes six hours blocks every deploy behind it
