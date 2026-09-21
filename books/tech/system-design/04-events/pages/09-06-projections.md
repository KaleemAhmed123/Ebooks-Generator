## Projections

- A **projection** is a consumer that folds events into a table shaped for reading — one row per aggregate, indexed and denormalised however the query needs, rebuilt from the event log whenever its shape needs to change. Nothing about it is special-cased in the broker; it is an ordinary consumer with a fold instead of a pass-through handler

```typescript
async function apply(event: OrderEvent & { aggregateId: string; status: string }) {
  await db.query(
    `INSERT INTO order_summary (id, total, status) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET total = $2, status = $3`,
    [event.aggregateId, "total" in event ? event.total : 0, event.status]);
}
```

- A projection needs the same two guarantees an idempotent consumer needs anywhere in this booklet (Module 5, page 7): idempotent apply, because redelivery happens, and per-aggregate order, because applying `ItemAdded` before `Placed` folds to nonsense. Partitioning by aggregate id (Module 4, page 2) is what keeps one aggregate's events in order on the way in
- Nothing stops a service from running more than one projection off the same event log — one per screen that needs a different shape, each independently rebuildable by replaying from zero

### The failure

- A projection that applies events out of order because it reads from a topic keyed by something other than the aggregate id. Two updates to order 42 land on different partitions, race each other, and the projection can show either one as current depending on which consumer thread wins
