## Materializing conflicts

- Locks need a row. When the rule is about rows that do not exist yet ("this slot is free"), create the row in advance: one row per room and time window, and let the booking write **to that row**. The phantom becomes a lock target
- The DDIA name is **materializing conflicts**; the honest name is "make the invariant a row"

```sql
-- one row per (room, slot), created when the room is; the booking is a conditional update
UPDATE slots SET booked_by = $1
 WHERE room = 42 AND slot = '10:00' AND booked_by IS NULL;
-- rowCount 1: yours. rowCount 0: someone else's. No check, no insert, no window
```

- One statement replaces check-then-insert, so it works at Read Committed on every vendor. A `UNIQUE (room, slot)` constraint on `bookings` is the same idea when a slot holds at most one booking: the index is the materialised row
- Where the slot can hold several bookings (a capacity), keep a counter on the slot row and update it atomically: `UPDATE slots SET taken = taken + 1 WHERE … AND taken < capacity`

:::interview
"How do you prevent double booking?" — Never check-then-insert. Make the slot a row and update it conditionally, or put a unique constraint on the pair; the database serialises the two writers and the loser gets zero rows. Serializable isolation also works, with a retry loop, at the cost of aborts under load.
:::

### The failure

- `SELECT … FOR UPDATE` on the slot row, then a `count(*)` of bookings, then an insert. It looks right and works at Read Committed. At Postgres Repeatable Read the count after the lock still reads the transaction's old snapshot, sees zero, and double-books. Write the decision into the locked row itself
