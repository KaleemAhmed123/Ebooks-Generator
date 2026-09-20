## Locks on a consensus store

- etcd and ZooKeeper give the two things pages 3 and 4 asked for: a lease that dies with the client's session, and a monotonic number from the same decision. The shape, etcd-style: grant a lease with a TTL; create the lock key only if it does not exist yet, attached to the lease; keep the lease alive; use the key's revision as the fencing token

```typescript
// Etcd is the client's transaction API, shortened; revision is the header revision of the write
async function lock(etcd: Etcd, key: string, ttlSec: number) {
  const lease = await etcd.leaseGrant(ttlSec);           // dies if we stop sending keepalives
  const res = await etcd.txn({
    compare: [{ key, createRevision: 0 }],               // key does not exist yet
    success: [{ put: { key, value: "me", lease } }],
  });
  if (!res.succeeded) { await etcd.leaseRevoke(lease); return null; }
  return { lease, token: res.header.revision };          // monotonic: larger than every earlier grant
}

// every write to the protected resource carries the token, and the resource checks it
await db.query("UPDATE jobs SET state = $1, fence = $2 WHERE id = $3 AND fence < $2", [state, token, id]);
```

- ZooKeeper's recipe is the ordered queue: create an `EPHEMERAL_SEQUENTIAL` znode under the lock's path; the lowest sequence number holds; each waiter watches the znode just below its own, so a release wakes one client, not all. The znode's sequence number or `zxid` is the token; the session's end deletes the znode
- Both stores are majority-backed (Module 7), so the lock survives one of three or two of five nodes failing, and a client on the minority side of a partition cannot renew: its lease lapses and its writes, carrying an old token, are refused where the check exists

### The failure

- The token stays in the client. The lock is perfect and the `UPDATE` has no `fence` column. A paused holder resumes, the lease is long gone, the write goes through. Page 4 again: the token has to reach the resource, and the resource has to compare it
