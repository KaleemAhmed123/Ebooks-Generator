## Holding a seat

- When a user clicks a seat, they have 5 minutes to enter their credit card. During this time, the seat is "held" and cannot be clicked by anyone else
- **Database Lock (Postgres):** You can use `SELECT ... FOR UPDATE` (→03). However, a standard lock blocks the database connection. You must use `NOWAIT` so other users instantly get an error rather than waiting in a queue
- **Redis Lock:** A better approach for high traffic is a distributed lock in Redis: `SET seat:123 user_id NX EX 300`. 
  - `NX` ensures the lock is only acquired if it doesn't exist
  - `EX 300` ensures the hold expires automatically after 5 minutes if the user closes their browser
- When the hold expires, the seat automatically becomes available again

### The failure

- Storing the hold state in the application server's local memory. If the pod crashes or autoscales down, all active holds are lost, and users lose their tickets mid-checkout.

:::interview
A user clicks a seat, but their laptop battery dies before they pay. How does the system ensure the seat isn't locked forever?

The seat hold is created with a strict Time-To-Live (TTL), usually in Redis. If the payment is not completed within 5 minutes, the TTL expires and the seat becomes available to other users.
:::\n