## Read Committed

- **Read Committed** is the default isolation level in Postgres, SQL Server, and Oracle. It guarantees two things: no dirty reads, and no dirty writes
- To prevent dirty writes, the database takes a lock on the row when you update it. To prevent dirty reads, the database remembers both the old committed value and the new uncommitted value. Readers simply see the old value until the writer commits

```sql
-- Session A                               -- Session B
BEGIN;
UPDATE users SET plan = 'PRO';

                                           BEGIN;
                                           -- Sees the OLD value ('FREE')
                                           SELECT plan FROM users;

COMMIT;

                                           -- Sees the NEW value ('PRO')
                                           -- wait, the value changed mid-transaction!
                                           SELECT plan FROM users;
```

- Under Read Committed, each *individual statement* sees a fresh snapshot of the database at the exact moment that statement begins
- This leads directly to the **Non-repeatable Read** anomaly: two `SELECT` statements inside the exact same transaction can return completely different data

### The failure

- Running a backup script or an analytics query under Read Committed. If a backup script takes 10 minutes to run, it will read the `users` table at 12:00 and the `payments` table at 12:10
- If a user upgrades their account at 12:05, the backup will contain their payment, but their user record will still say "Free plan". Restoring from this backup corrupts the data
