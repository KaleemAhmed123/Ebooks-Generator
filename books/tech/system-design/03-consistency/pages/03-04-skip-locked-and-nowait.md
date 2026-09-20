## SKIP LOCKED and NOWAIT

- Sometimes you want pessimistic locking, but you explicitly do *not* want to queue up and wait
- If you use `SELECT ... FOR UPDATE NOWAIT`, the database will attempt to lock the row. If another transaction already holds the lock, the database immediately aborts your transaction with an error instead of blocking
- If you use `SELECT ... FOR UPDATE SKIP LOCKED`, the database simply skips over any rows that are currently locked by other transactions, returning only the free rows

```sql
-- Transaction A starts processing a job
BEGIN;
SELECT * FROM jobs 
WHERE status = 'PENDING' 
ORDER BY priority DESC 
FOR UPDATE SKIP LOCKED 
LIMIT 1;
-- Returns Job 42 and locks it

-- Transaction B concurrently asks for a job
BEGIN;
SELECT * FROM jobs 
WHERE status = 'PENDING' 
ORDER BY priority DESC 
FOR UPDATE SKIP LOCKED 
LIMIT 1;
-- Skips Job 42 entirely! Returns Job 43 and locks it.
```

- **Job queues in SQL**: `SKIP LOCKED` is the magic phrase that allows you to build a highly concurrent job queue directly inside Postgres. Without it, worker B would sit in a queue waiting for worker A to finish Job 42

### The failure

- Polling workers stampeding on the same row. If you build a SQL job queue without `SKIP LOCKED`, ten workers will query for `status = 'PENDING' LIMIT 1`. All ten workers will try to lock Job 42. Worker 1 will get the lock, and workers 2–10 will block. When worker 1 finishes, worker 2 will wake up, realize Job 42 is already done, and waste a query. You have destroyed your concurrency
