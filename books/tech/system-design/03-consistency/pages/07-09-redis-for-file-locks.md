## Redis for file locks

- To prevent the Split-Brain File, Figma uses **Redis Distributed Locks**. When a user tries to open File 42, the routing layer asks Redis: "Who owns File 42?"
- If no one owns it, the routing layer picks a random Server (e.g., Server 1), and Server 1 acquires a lock in Redis (`lock:file42 = server1`). All subsequent users who open the file are routed by Redis to Server 1

```typescript
// A simplified view of Figma's Redis locking
async function getOrAssignServer(fileId: string) {
  // 1. Who owns it?
  let owner = await redis.get(`lock:${fileId}`);
  
  if (!owner) {
    // 2. Assign to a random healthy server
    const newServer = pickRandomServer();
    
    // 3. Try to acquire the lock (SET if Not eXists)
    const success = await redis.setnx(`lock:${fileId}`, newServer);
    
    // If we won the race, this server is the owner
    if (success) {
      owner = newServer;
    } else {
      // Someone beat us to it, fetch their server ID
      owner = await redis.get(`lock:${fileId}`);
    }
  }
  
  return owner;
}
```

- If Server 1's AWS instance catches fire, the TCP connection drops, and the Redis lock expires. The next user to open the file will trigger the assignment of a new server

### The failure

- Missing the fencing token. We learned in Module 6 that Redis locks are not safe. What if Server 1 doesn't catch fire, but just experiences a 15-second Garbage Collection pause? The Redis lock expires. Server 2 takes over. Server 1 wakes up, thinks it still owns the file, and flushes a checkpoint to Postgres. You have a split-brain again!
