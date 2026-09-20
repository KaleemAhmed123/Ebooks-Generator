## What the interviewer probes

- **Seat map caching:** The seat map (which seats are red/green) must be cached, but with a very short TTL (e.g., 2 seconds). It's better for a user to see a green seat, click it, and get a "Sorry, taken" error, than to query the master database on every page load
- **Payment timeout vs Hold TTL:** The hold TTL (5 mins) must be strictly *longer* than the payment gateway timeout. If the PSP takes 6 minutes to return "Success", but your hold expired at 5 minutes, you might have sold the seat to someone else
- **SKIP LOCKED:** If you use Postgres for worker queues, use `SELECT ... FOR UPDATE SKIP LOCKED`. This allows multiple workers to pull tasks without waiting on each other

### The failure

- Making the Hold TTL shorter than the payment flow. A user pays, the PSP takes 60 seconds to process, the hold expires at 50 seconds, another user claims it, and the first user's payment clears. You just double-sold the seat.

:::interview
A user's payment takes an unusually long time to process. The seat hold expires. Another user claims the seat. The first payment finally succeeds. How do you prevent this disaster?

The Seat Hold TTL must always be significantly longer than the maximum possible timeout configured on your Payment Gateway integration.
:::\n