## Matching

- The matcher takes the k nearest from the index (page 4), ranks them by ETA and offers the trip to one driver at a time: the driver row is `offered` until accept, decline or expiry; every transition is `WHERE status = <expected>` (Module 11, page 5)
- Two riders, one driver, the same second: both matchers read `available`, both offer. The check and the mark must be one transaction over the driver row and the trip row. Uber's 2021 fulfillment post: an AP store (Ringpop over Redis) with saga compensations left entities inconsistent, so trip state moved to Spanner for one commit across both

```typescript
async function offer(tripId: string, driverId: string, ttlMs = 15_000) {
  return db.transaction(async (tx) => {             // commit: both rows or neither
    const d = await tx.one(
      "SELECT status FROM drivers WHERE id=$1 FOR UPDATE", [driverId]);
    if (d.status !== "available") return false;   // someone else got here first
    await tx.run("UPDATE drivers SET status='offered', expires=$2 WHERE id=$1",
      [driverId, new Date(Date.now() + ttlMs)]);
    await tx.run("UPDATE trips SET status='offered', driver_id=$2 WHERE id=$1",
      [tripId, driverId]);
    return true;
  });
}
```

:::interview
"Two riders request at once and the nearest driver is the same. How do you stop both getting them?" — The offer is a transaction: lock the driver's row, check it is still available, mark it offered with an expiry, and update the trip in the same commit. The second matcher reads `offered` and moves on; that one serialised write per offer is why the position firehose stays out of this store.
:::

### The failure

- The match on an AP store. Two matchers read "available" from replicas that have not seen each other's write, both offer, and the driver's phone pings twice. Uber's reason for leaving Ringpop: a compensation does not un-offer a driver who already accepted
