## SKIP LOCKED and NOWAIT

- Two ways to lock without queueing. **`NOWAIT`** fails at once if the row is locked, SQLSTATE `55P03`, instead of waiting. **`SKIP LOCKED`** leaves locked rows out of the result and returns the next free ones
- `SKIP LOCKED` is how a job queue lives in SQL: every worker asks for one unlocked pending row, and each gets a different one

```sql
-- every worker runs this in its own transaction
SELECT id, payload FROM jobs
 WHERE status = 'pending'
 ORDER BY priority DESC, id
 FOR UPDATE SKIP LOCKED
 LIMIT 1;
-- worker A locks job 42; worker B, asking at the same time, is handed job 43
-- do the work, UPDATE jobs SET status = 'done' WHERE id = 42, COMMIT
```

- The lock is the claim. If the worker dies mid-job its transaction rolls back, the row unlocks, and the next worker picks it up: retry for free, no heartbeat table. The transaction must therefore stay open for the whole job, which caps job length at what the database tolerates (Module 1, page 7)

### The failure

- The same query without `SKIP LOCKED`. Ten workers all match job 42; one locks it, nine queue behind it, and when it commits the nine wake up, find `status = 'done'` no longer matches, and return nothing. Ten workers, the throughput of one
