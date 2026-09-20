## Maintaining order in retries

- We just saw how DLQs and Retry Topics save our partitions from halting. But they come with a brutal trade-off: **Moving a message to another topic permanently breaks ordering for that key**

| Approach | Flow | Ordering Guarantee |
|---|---|---|
| **Strict Order** (Halt on failure) | Fail → Block Partition → Alert Engineer → Fix bug → Resume | **Guaranteed.** You never process Event 2 before Event 1. |
| **Fast Lane** (DLQ / Retry) | Fail → DLQ Event 1 → Ack → Proceed to Event 2 | **Broken.** Event 2 is processed while Event 1 is sitting in the DLQ. |

- You must choose one. You cannot have both maximum throughput (Fast Lane) and perfect causal ordering (Strict Order).

### The failure

- DLQing an `ItemAdded` event, processing the `Checkout`, then replaying the DLQ. The `ItemAdded` event hits a temporary DB lock and is routed to the 5-minute Retry Topic. The main partition moves on. Two seconds later, the user clicks "Checkout". The `Checkout` event is processed successfully, charging the user for an empty cart. Five minutes later, the Retry Topic successfully processes the `ItemAdded` event. The system is now completely inconsistent. If strict order for a single key (like a User ID) is required for correctness, you *cannot* use DLQs or asynchronous retry topics. You must halt the partition and wake up an engineer
