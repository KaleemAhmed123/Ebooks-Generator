## Testing an event flow

- Three layers, cheapest first: **contract tests** on the schema itself — does this producer's output still satisfy what a consumer's schema declares, run in CI instead of waiting on the registry's own register-time check (Module 11, page 4); **consumer tests with recorded events** — replay a fixture captured from a real event through the actual handler, no broker involved; and integration tests that do run a real broker, kept few, because they are the slowest and most flaky layer

```typescript
test("idempotent consumer skips a duplicate", async () => {
  const event = { id: "evt-1", orderId: 42, amount: 500 };
  await handle(event);
  await handle(event); // redelivered
  expect(await db.query("SELECT count(*) FROM processed WHERE message_id = $1", [event.id]))
    .toEqual([{ count: "1" }]);
});
```

- A unit test that mocks the broker exercises the handler's own logic — the fold, the idempotency check, the projection write — without needing Kafka or RabbitMQ running at all, which is most of what actually breaks in a handler
- Skipping all of this in favour of "we'll see it in production" turns every consumer team's test suite into the same one broker cluster, shared, flaky, and slow to reset between runs — the gap this leaves is not a broken handler caught late, it is the absence of any test that could have caught it before a real deploy

### The failure

- No test below the level of a live broker connection anywhere in a service's suite. Every change either skips testing the event handler at all, or spins up a real Kafka cluster in CI for a check that a fixture and a mock database could answer in milliseconds
