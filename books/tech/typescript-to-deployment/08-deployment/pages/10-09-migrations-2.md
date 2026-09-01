### The expand and contract pattern

- **Deploy 1, expand.** Add the new nullable column. Old code ignores it, new code is not there yet
- **Deploy 2, write both.** Code writes the old and new columns, reads the old one. Backfill in the background
- **Deploy 3, read new.** Code reads the new column
- **Deploy 4, contract.** Drop the old column, once nothing references it

- Slower, and **every step is independently reversible**, which a rename is not

### The rules

- **Never rename or drop in the same deploy that changes the code.** A rollback then has no working schema to return to
- **`CREATE INDEX CONCURRENTLY`** on a large table, or the migration locks writes for the duration
- **Set a `lock_timeout`.** A migration waiting on a lock queues every other query behind it, which is how one `ALTER TABLE` takes the site down
- **Snapshot before anything destructive**, and put the snapshot id in the deploy notes
