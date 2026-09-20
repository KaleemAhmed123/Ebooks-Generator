## 2PC in real systems

- Despite its reputation in microservices, 2PC is actively used in modern distributed systems. You just don't see it, because it is hidden entirely within the boundaries of a single system where network latency is strictly controlled

```sql
-- Postgres exposes 2PC manually, but warns against using it
-- in application code. It is meant for XA Transaction Managers.
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
PREPARE TRANSACTION 'tx_42'; 
-- Locks are now held, connection can be closed.

-- ... Coordinator does its work ...

COMMIT PREPARED 'tx_42'; 
-- Locks are released.
```

- In Postgres, 2PC is considered so dangerous that `max_prepared_transactions` defaults to `0`. It is literally turned off by default to protect you from yourself
- **DynamoDB**: When you use the `TransactWriteItems` API in DynamoDB, Amazon uses a custom 2PC protocol under the hood across its storage nodes. This is why a transaction costs twice as much capacity as a normal write: the storage nodes must do one write for the Prepare phase, and one write for the Commit phase

### The failure

- Treating `PREPARE TRANSACTION` as an application feature. If you try to use Postgres's 2PC commands manually from a Node.js API to orchestrate writes across two databases, you are building a custom Distributed Transaction Manager. You will inevitably introduce an "in doubt" bug during a deploy, locking up production tables until someone drops the database
