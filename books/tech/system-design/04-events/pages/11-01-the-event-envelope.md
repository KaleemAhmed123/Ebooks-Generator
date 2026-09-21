# Module 11 - Event schemas

## The event envelope

- **CloudEvents** standardises the wrapper every event carries regardless of payload: required `id`, `source`, `specversion`, `type`, and commonly `time`, `subject`, `data`. The spec's own dedup rule: "producers MUST ensure that source + id is unique for each distinct event," and "consumers MAY assume that events with identical source and id are duplicates"

```json
{
  "specversion": "1.0",
  "id": "b4b4b4b4-0000-0000-0000-000000000000",
  "source": "/orders-service",
  "type": "com.example.order.placed",
  "time": "2026-09-21T10:00:00Z",
  "subject": "order-42",
  "data": { "orderId": 42, "total": 5000 }
}
```

- `source + id` is not decoration: it is the dedup key every idempotent consumer in this booklet (Module 5, page 7) needs and no broker guarantees for free. An envelope without an id gives a consumer nothing to dedupe on beyond payload equality, which breaks the moment two distinct events happen to look alike
- Every other page in this module assumes the envelope exists; they are about what goes in `type` and `data`, and how those two fields are allowed to change

### The failure

- A payload with no id field, "since the broker already numbers messages." A broker's offset identifies a position in a partition, not the event; replaying that offset onto a rebuilt topic (Module 7, page 2) changes the position and keeps the same event with no way to tell a consumer it has seen this one before
