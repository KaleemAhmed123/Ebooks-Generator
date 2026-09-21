## Event sourcing

- **Event sourcing**: every change to an aggregate is stored as an event, in order, and its current state is rebuilt by folding those events — never by reading a stored "current" row. Fowler's three payoffs: a complete rebuild from the log, temporal queries (state as of any past point), and event replay for what-if

```typescript
type OrderEvent =
  | { type: "Placed"; total: number }
  | { type: "ItemAdded"; amount: number }
  | { type: "Cancelled" };

function fold(events: OrderEvent[]): { total: number; cancelled: boolean } {
  return events.reduce(
    (s, e) =>
      e.type === "Placed" ? { total: e.total, cancelled: false } :
      e.type === "ItemAdded" ? { ...s, total: s.total + e.amount } :
      e.type === "Cancelled" ? { ...s, cancelled: true } : s,
    { total: 0, cancelled: false }
  );
}
```

- The fold must be deterministic and side-effect-free, because it runs again on every replay. A fold that calls an external service re-runs that call for every historical event on every rebuild — Fowler's own warning: "replaying events becomes problematic when results depend on interactions with outside systems"
- An event store is the log of record here, not a broker (page 4) — a topic replayed for a rebuild and a topic replayed for a downstream consumer are different operations reading the same data for different reasons

### The failure

- A fold that calls a payment gateway to "double-check" a total during rebuild. Rebuilding after an incident replays a year of orders and calls the gateway a year's worth of times, in minutes, and gets rate-limited
