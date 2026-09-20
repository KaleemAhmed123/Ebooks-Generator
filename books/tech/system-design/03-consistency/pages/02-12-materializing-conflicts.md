## Materializing conflicts

- If you are running at Read Committed or Repeatable Read, you are completely unprotected against write skew and phantoms. If you cannot upgrade to Serializable isolation (because it is too slow, or your database doesn't support it), how do you prevent these bugs?
- The answer is a pattern called **Materializing Conflicts**

- Remember the phantom read problem: you cannot lock a row using `SELECT FOR UPDATE` if the row does not exist yet. Materializing conflicts solves this by artificially creating a row for you to lock
- If you are building a meeting room booking system, you can create a table called `timeslots` that pre-populates every 15-minute interval for every room for the next year

```sql
-- Step 1: Materialize the conflict by locking the timeslot
-- This row ALWAYS exists, so the lock ALWAYS works.
SELECT * FROM timeslots 
WHERE room_id = 42 AND time = '10:00' 
FOR UPDATE;

-- Step 2: Now that you hold the lock, check the premise
SELECT count(*) FROM bookings WHERE room_id = 42 AND time = '10:00';

-- Step 3: Insert the booking if safe
INSERT INTO bookings ...;
```

- By forcing all concurrent transactions to lock the exact same `timeslots` row before they are allowed to check the premise, you serialize them. The first transaction wins the lock, checks the premise, and inserts. The second transaction waits. When the second transaction finally gets the lock, it checks the premise, sees the first transaction's inserted row, and safely aborts

### The failure

- Using materializing conflicts when Serializable is available. Materializing conflicts is an ugly, manual hack. It clutters your database schema with fake rows and pushes concurrency logic into your application. You should only use it if your database forces you to
