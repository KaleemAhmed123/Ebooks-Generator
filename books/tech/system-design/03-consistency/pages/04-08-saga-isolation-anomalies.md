## Saga isolation anomalies

- A database transaction provides Isolation: concurrent users cannot see your intermediate writes. A saga provides **zero isolation**. The moment Service A commits its local transaction, the rest of the world can see that state, even though Service B hasn't run yet
- Because of this, sagas are vulnerable to the exact same anomalies we discussed in Module 2

| Database Anomaly | Saga Equivalent | Countermeasure |
|---|---|---|
| **Dirty Read** | Reading a saga's partial state before it rolls back. | **Semantic Locks**: Add a `status = PENDING` flag to the row. Other services must refuse to read pending rows. |
| **Lost Update** | Two sagas racing to modify the same inventory count across services. | **Commutative Updates**: Design steps so order doesn't matter (e.g., `inventory = inventory - 1` instead of `inventory = 99`). |
| **Non-repeatable Read** | Saga reads data in Step 1, but by Step 4 (the Pivot), someone else changed it. | **Re-read before pivot**: The pivot step must aggressively re-fetch the data to ensure the premise is still true. |

### The failure

- Ignoring saga isolation until production. If Saga 1 credits a user $100 in Step 1, and Saga 2 reads that balance and lets the user buy a game, what happens when Saga 1 fails at Step 3 and runs its compensation (debiting $100)? The user's balance drops below zero. You just gave away a free game because Saga 2 dirty-read Saga 1's intermediate state
