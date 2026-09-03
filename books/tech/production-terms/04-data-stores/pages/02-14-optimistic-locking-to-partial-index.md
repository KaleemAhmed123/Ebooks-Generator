## Optimistic Locking

No locks at all. Read a version number, and require it to be unchanged when you
write. Cheap when conflicts are genuinely rare.

`UPDATE doc SET body = ?, version = version + 1 WHERE id = ? AND version = 7`.
Zero rows updated means somebody else got there first.

The whole mechanism is that zero. It costs nothing while nobody collides, and it
never silently overwrites when they do — which is the failure a last-write-wins
update produces instead.

**Decide what happens on the retry before you ship it.** Retrying blindly can
reapply an edit against content the user never saw, which is a different kind of
lost update wearing a version number.

## Partial Index

An index with a `WHERE` clause, so it only stores the rows you actually query.
Smaller, faster, and cheaper to keep current.

Only 0.3% of jobs are pending, and the queue query looks at nothing else.

```sql
CREATE INDEX ON jobs (created_at) WHERE status = 'pending';
```

The full index carries four million rows. The partial one carries twelve
thousand — small enough to stay in memory, and it stops being written to the
moment a job leaves the pending state.

For any status-driven queue table, this is usually the single largest index win
available, and it is one line.
