## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| the seat map under 20 000 reads/s | a cached copy per event with a TTL of a second or two (Module 4), rebuilt from the table or patched by hold and release events. A user may click a seat that was taken a second ago and be told so (page 3); that is cheaper than 20 000 table reads a second, and the hold is what is authoritative |
| the payment takes longer than the hold | the hold's TTL is longer than the payment step's total timeout, retries included (Module 11, page 7), plus a margin. A hold of 10 minutes against a payment timeout of 2 minutes. The failure below is the other order |
| the buyer pays and the hold had expired anyway | the confirm step is a conditional update `WHERE held_by = $user AND status = 'held'`; if it matches zero rows the payment is refunded through the state machine (Module 11, page 5) and the buyer is told. Rare by construction, never silent |
| bots | the waiting room's token is signed and per session (page 4); admission is rate-limited per account and per device (Module 3); a purchase limit per account is a `CHECK` on the booking, not a front-end rule |
| a worker queue for post-purchase work, in Postgres | `SELECT … FOR UPDATE SKIP LOCKED`: workers take unlocked rows and skip the ones another worker holds. The Postgres docs say this gives an inconsistent view and is not for general use, but is for queue-like tables with multiple consumers, which is exactly this |
| releasing holds at scale | a sweeper on `hold_expires < now()`, indexed, every few seconds; or the Redis TTL does it. Either way the release is idempotent, because the reclaim on the next hold (page 3) also handles it |

- The metric: seats sold per minute during the on-sale window against the admission rate, and the count of holds that expired unpaid, which is the TTL and the checkout's health in one number
- Cross-references the design leans on: row locks, optimistic versions and `NOWAIT` (booklet 03); the cache and its TTL (Module 4, booklet 05); shedding vs queueing (Module 3, booklet 05); the payment's state machine (Module 11)

### The failure

- A hold TTL shorter than the payment. The hold is 5 minutes, the PSP's timeout with retries is 6, the hold lapses at minute 5, another buyer holds and pays for the seat, then the first payment clears. Two paid bookings for A-14, and the refund is the cheap part. The hold outlives the payment, always
