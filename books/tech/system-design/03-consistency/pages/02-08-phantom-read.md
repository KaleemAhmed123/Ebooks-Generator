## Phantom read

- A **phantom** is a row that appears in a query's range between two runs of the query, because another transaction inserted it. Locks attach to rows; a row that does not exist yet has nothing to attach to

```sql
-- Transaction A                                    -- Transaction B
BEGIN;
SELECT count(*) FROM bookings
  WHERE room = 42 AND slot = '10:00';               -- 0, the room is free
                                                    BEGIN;
                                                    INSERT INTO bookings (room, slot) VALUES (42, '10:00');
                                                    COMMIT;
INSERT INTO bookings (room, slot) VALUES (42, '10:00');
COMMIT;                                             -- two bookings, one room
```

- The pattern is **check, then insert**. The check reads a set; the insert changes the set the other transaction checked. Nothing was updated, so no row lock ever conflicted
- Postgres Repeatable Read hides the phantom from A's second `SELECT` and still lets both inserts commit; the snapshot protects reads, not the rule. InnoDB's locking reads take next-key locks on the range, so `SELECT … FOR UPDATE` at Repeatable Read does block B's insert

### The failure

- `SELECT … FOR UPDATE` on a query that returns zero rows. In Postgres it locks the rows it found, which is none, and the insert underneath goes ahead. The fix is either a `UNIQUE` constraint on `(room, slot)`, a row that stands for the slot (page 10), or Serializable (Module 3, page 7)
