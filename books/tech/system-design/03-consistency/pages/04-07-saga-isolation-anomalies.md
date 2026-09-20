## Saga isolation anomalies

- A database transaction hides its writes until commit. A saga hides nothing: T1's commit is visible to the world while T2 has not started. Module 2's anomalies come back at the workflow level, and no isolation level fixes them, because no database sees the whole saga

| Anomaly, saga edition | What it looks like | Countermeasure |
|---|---|---|
| dirty read | a second workflow reads the credited balance; the saga then compensates the credit | **semantic lock**: the row carries `status = 'pending'` and readers treat pending as absent |
| lost update | two sagas each read stock 10, each reserve 3, each write 7 | **commutative updates**: `stock = stock - 3`, never `stock = 7` |
| non-repeatable read | the premise checked in T1 has changed by the pivot | **re-read before the pivot**: check it again in the same local transaction as the pivot's write |

- The semantic lock is the workhorse: a `pending` state that the saga sets in T1 and clears in Tn, with every other reader and writer of that row taught what pending means

### The failure

- A saga credits an account in T1, a purchase reads the balance and goes through, then the saga fails at T3 and debits the credit back. The balance is below zero, and the purchase was a dirty read that no database could have prevented. The credit should have been a pending entry that the purchase's check did not count
