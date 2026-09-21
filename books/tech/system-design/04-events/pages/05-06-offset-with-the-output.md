## Offset with the output

- Kafka's docs give the recipe for a destination outside Kafka: let the consumer store its offset in the same place as its output. One database transaction, two rows: the effect and the position. A crash leaves both or neither

```typescript
async function handle(rec: Record) {
  await db.tx(async (t) => {
    await t.query(
      `INSERT INTO payments (order_id, amount) VALUES ($1, $2)
       ON CONFLICT (order_id) DO NOTHING`, [rec.key, rec.value.amount]);
    await t.query(
      `INSERT INTO offsets (topic, partition, next_offset) VALUES ($1, $2, $3)
       ON CONFLICT (topic, partition) DO UPDATE SET next_offset = EXCLUDED.next_offset`,
      [rec.topic, rec.partition, rec.offset + 1n]);
  });
}
// on start: read offsets, then consumer.seek(topic, partition, next_offset)
```

- On startup the consumer reads its position from the database, not from Kafka, and seeks there. Kafka's own committed offset becomes a monitoring number (Module 3, page 9), not the source of truth
- The effect row still carries a unique key. The transaction removes the crash-between-two-commits gap; the constraint covers a rebalance handing the same record to a second consumer before the first finished
- What it costs: a row per partition, a seek on start, and a consumer that cannot be rebalanced freely, since the position lives in its own database

### The failure

- Two commit points. The team adopts the pattern but leaves auto-commit on as well. Now there are two positions, in two systems, and the one Kafka uses after a rebalance is the one on the timer. The database position is right; the group ignores it
