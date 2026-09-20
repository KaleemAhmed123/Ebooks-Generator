## 2PC in real systems

- 2PC is not gone; it moved inside systems where one operator controls the coordinator and the network. Postgres exposes the participant side, XA transaction managers play coordinator, and DynamoDB runs the whole protocol behind one API call

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
PREPARE TRANSACTION 'order-42';   -- durable, locks held, detached from this session
-- the transaction manager collects every participant's vote, then:
COMMIT PREPARED 'order-42';       -- or ROLLBACK PREPARED 'order-42'
```

- The Postgres docs say the command is "not intended for use in applications"; it exists so an external transaction manager can drive phase 2. `max_prepared_transactions` defaults to 0, which disables it, and a prepared transaction survives a server restart with its locks
- DynamoDB `TransactWriteItems` is 2PC inside one service: two underlying writes per item, prepare and commit, which is why a transaction consumes double capacity; up to 100 items and 4 MB, one Region, with a `ClientRequestToken` that makes a retry idempotent for 10 minutes

### The failure

- `PREPARE TRANSACTION` driven from application code. A deploy restarts the process between prepare and commit, and the prepared transaction sits in `pg_prepared_xacts` holding its locks until an operator finds it. The transaction manager's job is exactly to survive that restart; an API server is not one
