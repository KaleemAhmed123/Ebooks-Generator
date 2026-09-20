## Phantom read

- A **phantom read** occurs when you execute a search query that matches a range of rows, and a concurrent transaction inserts or deletes a row that falls *inside* that range. If you execute the exact same query again, a "phantom" row appears or disappears
- Phantoms are the hardest anomaly to prevent because you cannot lock a row that doesn't exist yet

```sql
-- Transaction A (Read Committed or Repeatable Read)
BEGIN;
SELECT count(*) FROM meeting_rooms WHERE time = '10:00' AND booked = true;
-- Returns 0. The room is free!

-- Transaction B
                                                BEGIN;
                                                INSERT INTO meeting_rooms ...;
                                                COMMIT;

-- Transaction A
-- If we run the exact same query again...
SELECT count(*) FROM meeting_rooms WHERE time = '10:00' AND booked = true;
-- Returns 1. A phantom!
```

- In Postgres Repeatable Read, phantoms are automatically prevented by the MVCC snapshot. The snapshot was taken before Transaction B committed, so Transaction A simply ignores the new row
- In InnoDB Repeatable Read, phantoms are NOT prevented for writes! If Transaction A attempts to `UPDATE` the rows it just counted, InnoDB abandons the snapshot, fetches the absolute latest data, and updates the phantom row

### The failure

- Using `SELECT FOR UPDATE` to prevent phantoms. `FOR UPDATE` only locks rows that *the query actually finds*. If the query returns zero rows, the database acquires zero locks. Transaction B is completely free to insert a new row right beneath you
