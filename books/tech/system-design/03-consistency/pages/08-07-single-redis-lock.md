## The single-instance Redis lock

- One Redis instance; one key per lock. **Acquire** is one atomic command: set the key only if it does not exist, with an expiry, holding a random value that identifies the holder. **Release** deletes the key only if it still holds that value, so a client cannot delete a lock that has since expired and been taken by someone else

```typescript
import { randomUUID } from "node:crypto";

async function acquire(redis: Redis, key: string, ttlMs: number): Promise<string | null> {
  const token = randomUUID();
  const ok = await redis.set(key, token, "NX", "PX", ttlMs);   // SET key token NX PX ttl
  return ok === "OK" ? token : null;                             // null: someone holds it
}

// Release only if the value is still ours. Redis 8.4+ has DELEX key IFEQ token;
// on older servers the same check-then-delete must be one Lua script, never GET then DEL.
const RELEASE = `if redis.call("GET", KEYS[1]) == ARGV[1] then return redis.call("DEL", KEYS[1]) end return 0`;
async function release(redis: Redis, key: string, token: string): Promise<boolean> {
  return (await redis.eval(RELEASE, 1, key, token)) === 1;
}
```

- The TTL is the lease (page 3). Pick it longer than the longest expected hold, then handle the case where the hold was longer anyway: the release returns `false`, and the work that ran after expiry may have run beside another holder
- This is an efficiency lock (page 6). It has no fencing token, and it has one instance: when that instance is down, nobody can lock. Replication does not help. A replica is asynchronous; promote it after the primary dies and the key written a millisecond before may not be on it, so a second client acquires the same lock on the new primary. The Redis documentation names this as the reason for Redlock (page 8)

### The failure

- `GET` then `DEL` for the release, as two commands. Between them the key expires and another client acquires it; the `DEL` removes the other client's lock. Then a third client acquires, and two holders run. The check and the delete must be one server-side step
