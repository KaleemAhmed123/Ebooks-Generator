## Often you do not need a lock

- A lock is a way of making one writer. The database already has ways of making one writer per row that need no lock service, no lease and no token, because the check and the write are one statement

| The need | Instead of a lock | How it decides |
|---|---|---|
| only one of two concurrent writers may win | **conditional write** (compare-and-set): `UPDATE … WHERE version = $1`; DynamoDB `ConditionExpression` | the row's version; the loser gets zero rows (Module 3, page 5) |
| a thing must exist once | **unique constraint**; insert and catch the violation | the index; the loser gets `23505` |
| a job must run once | **idempotency key** on the job (booklet 01) | a second run finds the key and stops |
| one writer per entity, always | **single-writer partition**: route every write for key K to one consumer (booklet 04) | the partitioner; no two consumers hold K |
| a counter, a set, a "last seen" | a data type that merges (booklet 02's CRDTs) | no decision needed; both writes survive |
| a slot with capacity | the slot row and `taken < capacity` in the `WHERE` (Module 2, page 10) | the row lock the update takes anyway |

- The pattern: move the decision into the write, so that the store, which is already serializing writes to that row, makes it. A lock service is a second store whose decision then has to be carried to the first (page 4). One store, one decision, no carrying
- A lock is left for the cases where the resource cannot decide: a long-running job that must not run twice across a fleet and has no single row to condition on, or a leader for a partition of work. Those are Module 7 and page 9

### The failure

- A global lock around a per-key operation. Every update to any account waits on one lease. The lock was added to stop two writers to the same account; a conditional update on that account's row stops them and lets the other accounts through
