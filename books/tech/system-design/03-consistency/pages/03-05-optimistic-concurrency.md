## Optimistic: Validate at commit

- Pessimistic locking (lock first) wastes time if conflicts are rare. **Optimistic concurrency control** assumes that conflicts are rare. You read the data, do your work locally without holding any locks, and only check for conflicts at the exact moment you try to write
- We saw the most common implementation of this earlier: the compare-and-set version column

```typescript
async function updateProfileOptimistic(userId: string, newBio: string) {
  // 1. Read without locking
  const user = await db.query('SELECT bio, version FROM users WHERE id = $1', [userId]);
  
  // 2. Write, but only if the version hasn't changed
  const result = await db.query(
    'UPDATE users SET bio = $1, version = version + 1 WHERE id = $2 AND version = $3', 
    [newBio, userId, user.version]
  );
  
  if (result.rowCount === 0) {
    throw new Error('Conflict detected! Someone else updated this profile.');
  }
}
```

- Notice that conflicts do not surface as database errors or deadlocks. They surface as `0 rows updated`. The application code must manually detect this and retry the entire operation (fetch the new version, re-apply the change, write again)

### The failure

- Using optimistic concurrency on high-contention rows. If 10,000 users try to like a post at the same time using optimistic concurrency, exactly one user will succeed on their first try. The other 9,999 will see a conflict and retry. On the second try, one succeeds, and 9,998 retry. You have built an infinite loop of retries that will melt your application servers
