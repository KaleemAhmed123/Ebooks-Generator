## Read-your-own-writes consistency

- To fix the "disappearing comment" bug, we need a stronger guarantee than Eventual Consistency. We need **Read-Your-Own-Writes Consistency**. 
- This guarantees that if a user writes some data, they will *always* see that data when they reload the page. Other users might see stale data for a few milliseconds, but the author themselves never will

```typescript
// The industry-standard implementation of Read-Your-Own-Writes
async function getUserProfile(userId: string, requestingUserId: string) {
  // Did this user update their profile in the last 10 seconds?
  const recentWrite = await redis.get(`last_write:${requestingUserId}`);
  
  if (recentWrite) {
    // Force the read to go to the Leader to guarantee fresh data
    return db.primary.query('SELECT * FROM users WHERE id = $1', [userId]);
  } else {
    // Safe to read from a Follower
    return db.replica.query('SELECT * FROM users WHERE id = $1', [userId]);
  }
}
```

- **How it works**: When a user performs a write, you set a flag (or a timestamp) in a fast cache like Redis, or in a JWT cookie on the client. For the next N seconds (or until the replica reports it has caught up), you route all of that user's read queries directly to the Leader

### The failure

- Routing all reads to the leader. Junior developers often encounter replication lag and decide to "just read from the primary" to fix the bug. If every read query is routed to the Leader, you have completely defeated the purpose of having read replicas. The Leader's CPU will hit 100%, and the system will crash under read load
