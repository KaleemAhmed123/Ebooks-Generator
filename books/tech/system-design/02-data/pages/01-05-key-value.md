## The key-value model

- **The value is opaque**. A key-value store (Redis, DynamoDB base tables) treats the payload as an uninterpretable blob of bytes. The only way to retrieve data is by providing the exact key
- Because the database does not understand the value, it cannot filter or sort by it. Every query other than a primary key lookup requires a full table scan

```typescript
// Fast: The database goes straight to the record (O(1))
const user = await db.get('user:101');

// Slow: The database must read every record to check the country
// Do not do this in a key-value store
const ukUsers = await db.scan({
  filter: (record) => record.country === 'UK'
});
```

- **Strengths**: Unmatched latency and throughput. When the database only has to hash a key and return a block of memory, it can serve millions of requests per second
- **Use for**: Caching, session storage, shopping carts, and any workload where you only ever read and write a single, known entity at a time

### The failure

- The second access pattern. You store users by `user_id`. Six months later, the business asks to look up users by their email address. Because the store is key-value, there is no way to do this without a full scan
- The fix is to maintain a secondary index (a second key-value mapping from `email → user_id`), which doubles the write cost
