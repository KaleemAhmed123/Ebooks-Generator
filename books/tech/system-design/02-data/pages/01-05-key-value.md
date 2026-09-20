## The key-value model

- **The value is opaque**. A key-value store (Redis, a DynamoDB base table) treats the value as bytes. The one operation is get or put by exact key
- The store cannot filter or sort by what is inside the value. Every other question is a scan

```typescript
type User = { name: string; country: string };
const db = new Map<string, User>(); // stands in for the store

// one hash, one record
const user = db.get('user:101');

// every record, every time: the store cannot see inside the value
const ukUsers = [...db.values()].filter((u) => u.country === 'UK');
```

- Fits: caches, sessions, carts, anything read and written one known entity at a time

### The failure

- The second access pattern. Users are stored by `user_id`. Six months later someone needs them by email. There is no index for it
- The fix is a second mapping, `email → user_id`, kept in step by every write. That is a secondary index written by hand, with none of the database's help keeping it consistent
