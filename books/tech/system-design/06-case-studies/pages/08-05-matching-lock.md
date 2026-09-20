## Matching and transactions

- When a rider requests a trip, the Matcher gets the 10 closest drivers from the Location Service. It must now offer the ride to Driver 1
- **The double-booking problem:** What if another rider requests a trip, and the Matcher offers it to Driver 1 at the exact same millisecond?
- **State Machine & Locks:** The trip and the driver are entities in a database. Uber originally used an AP (Available/Partition-tolerant) in-memory system (Ringpop). It resulted in race conditions and double-booked drivers.
- Uber rewrote this to use **Google Spanner** (a strongly consistent, distributed SQL database). When offering a ride, they execute a transaction to lock the driver's state to `OFFERED`. If it succeeds, the push notification is sent

```sql
-- Transactional lock to prevent double booking
BEGIN;
SELECT status FROM drivers WHERE id = 'D1' FOR UPDATE;
-- Check if status is still 'AVAILABLE'
UPDATE drivers SET status = 'OFFERED' WHERE id = 'D1';
COMMIT;
```

### The failure

- Using eventual consistency for ride matching. If you are handling real-world physics (a car cannot be in two places) and money, you need strong consistency (→03)

:::interview
Two riders request a car. The matcher selects the same driver for both. Because you used a NoSQL eventual consistency store, both riders see "Driver is on the way". Why did Uber abandon NoSQL for this?

Because physical assets (cars, hotel rooms, event tickets) cannot tolerate eventual consistency. Double-booking ruins the physical world UX. Strong transactional consistency is required.
:::
