### The rules that apply to all of them

- **Every consumer is idempotent.** All of these deliver at least once, and a duplicate will happen
- **Every queue has a dead letter queue, and something watches its depth.** A DLQ nobody looks at is a silent data loss
- **The message carries an id and a version**, so a consumer can deduplicate and a schema can change
- **The message carries the correlation id**, so a trace survives the hop. Booklet 6 covers why

### The pattern worth reusing

- **Write the event to your database in the same transaction as the work, then publish it from there.** That is the outbox pattern from Booklet 5
- Publishing directly inside a transaction means an event for a write that later rolled back, and there is no way to take it back
