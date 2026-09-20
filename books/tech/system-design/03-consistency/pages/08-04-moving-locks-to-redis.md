## Moving locks to Redis

- We cannot let 100,000 users hit Postgres. Postgres is a disk-backed, ACID-compliant database. It is too heavy to act as a bouncer. We must push the contention up the stack into a fast, in-memory cache: **Redis**
- Instead of using `SELECT FOR UPDATE` in Postgres, we use a fast atomic operation in Redis to shed the load before it ever touches the primary database

```typescript
// Fast load-shedding with Redis
async function reserveSeat(seatId: string, userId: string) {
  // 1. Hit Redis FIRST. This takes < 1ms.
  // SETNX = Set if Not eXists
  const success = await redis.setnx(`ticket:${seatId}`, userId);
  
  if (!success) {
    // 99,999 users hit this path instantly. 
    // They are dropped immediately. Zero load on Postgres.
    throw new Error('Sorry, someone else grabbed this seat.');
  }

  // 2. Only 1 user makes it this far.
  // Now it is perfectly safe to write to Postgres.
  await db.query('UPDATE seats SET owner = $1 WHERE id = $2', [userId, seatId]);
}
```

- By moving the lock to Redis, the 99,999 losers are rejected in microseconds. Postgres only sees 1 write. Redis is single-threaded and handles over 100,000 operations per second per shard, making it the perfect shield for extreme burst traffic

### The failure

- Checking Postgres first. If you write your code to say "Query Postgres to see if the seat is available, and *then* acquire the Redis lock", you have completely defeated the purpose of the shield. 100,000 users will query Postgres, the connection pool will exhaust, and the site will crash
