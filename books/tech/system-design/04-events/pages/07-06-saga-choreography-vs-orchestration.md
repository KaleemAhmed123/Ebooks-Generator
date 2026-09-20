## Saga Choreography vs Orchestration

- A Saga can be implemented using either Choreography (events bouncing between services) or Orchestration (a central controller). 
- Use Choreography for simple, 2-step flows. For anything complex (like the 4-step e-commerce checkout), you must use Orchestration.

```typescript
// A simplified Saga Orchestrator using AWS Step Functions or Temporal
async function runCheckoutSaga(orderId) {
  try {
    await inventory.reserve(orderId);
    try {
      await payment.charge(orderId);
      try {
        await shipping.createLabel(orderId);
        await orders.markComplete(orderId);
      } catch (e) {
        await payment.refund(orderId); // Rollback step 2
        throw e;
      }
    } catch (e) {
      await inventory.release(orderId); // Rollback step 1
      throw e;
    }
  } catch (e) {
    await orders.markFailed(orderId); // Terminal state
  }
}
```

- Frameworks like Temporal, AWS Step Functions, or Camunda are designed specifically to run these Orchestrators, automatically handling retries and compensations if the orchestrator itself crashes mid-execution.

### The failure

- A choreographed Saga failing at step 4 and nobody knowing how to rollback step 1. If you use Choreography for a 4-step saga, and Shipping fails, Shipping emits `ShippingFailed`. Payment listens to this and issues a refund, then emits `RefundIssued`. Inventory listens to *that* and releases the stock. The rollback logic is scattered across 4 different codebases. It is impossible to test, impossible to monitor, and guaranteed to break. If a Saga has more than 3 steps, use Orchestration
