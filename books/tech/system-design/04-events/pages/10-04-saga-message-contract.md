## Saga message contract

- Every message in a saga carries a **saga id** (identifies the whole workflow instance), a **step** (which stage this message belongs to), a **correlation id** (ties every message in one saga run together across services), and a **causation id** (the id of the message that caused this one) — the correlation/causation pair belongs on every event in the system, not only sagas, and is what lets an on-call engineer reconstruct a chain after the fact

```typescript
interface SagaMessage<T> {
  id: string;        // unique to this message, not to the step
  sagaId: string;
  step: string;
  correlationId: string;
  causationId: string; // the id of the message that caused this one
  payload: T;
}
// emitting the next step: carry the correlation id forward,
// set causationId to the specific prior message's own id, not its step name
function next<T>(prev: SagaMessage<unknown>, step: string, payload: T): SagaMessage<T> {
  return { id: crypto.randomUUID(), sagaId: prev.sagaId, step, correlationId: prev.correlationId, causationId: prev.id, payload };
}
```

- Per-step timeouts matter as much as the ids: a step with no timeout and no reply leaves the saga waiting forever with nothing to page on. A timeout turns silence into a failure the saga can compensate for
- These ids belong on the outbox row itself (Module 8, page 2), not added by the relay — the relay publishes whatever the transaction wrote, and the transaction is what knows the causation

### The failure

- No correlation id, discovered at 3am. A saga is stuck, five services logged their own step independently, and there is no shared key to search across all five log streams to find the one run that failed. Every message needs the id before the first one ships, not added once someone gets paged
