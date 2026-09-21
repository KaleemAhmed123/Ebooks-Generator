## The CDC event

- A CDC event carries `before`, `after`, and `op` — the row's state on both sides of the change, and which kind of change it was: `c` create, `u` update, `d` delete, `r` read (Debezium's own letter, from the initial snapshot, not a live write) — plus `ts_ms`

```json
{
  "before": null,
  "after": { "id": 42, "status": "PLACED" },
  "op": "c",
  "ts_ms": 1758000000000,
  "source": { "table": "orders" }
}
```

- The snapshot that runs before streaming starts emits every existing row as `op: "r"` — a read, not a change. A consumer that treats `r` like `c` re-fires every side effect a create would trigger, for every row that existed before the connector ever started
- `before` is null on a create, `after` is null on a delete; an update carries both, which is what makes CDC useful for computing a diff without a second query

### The failure

- Wiring order-confirmation email to any event on the `orders` topic. The first deploy's snapshot emits 200,000 `r` events for existing orders, and 200,000 confirmation emails go out for orders placed months ago. Filter on `op`, not on the topic
