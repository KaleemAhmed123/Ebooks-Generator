## The Command vs the Event

- To understand Event Sourcing, you must understand the strict difference between a **Command** and an **Event**.

| | Command | Event |
|---|---|---|
| **Naming** | Imperative verb (`CreateOrder`) | Past tense verb (`OrderCreated`) |
| **Meaning** | A request to do something. | A historical fact. It already happened. |
| **Rejection** | Can be rejected (e.g., validation fails). | **Cannot be rejected.** You cannot rewrite history. |
| **Issuer** | Issued by a user or another system. | Emitted by the system after a Command succeeds. |

- The flow is always: A User sends a Command. The Application validates it. If valid, the Application writes an Event to the Event Store. 

### The failure

- Treating an event as a command and rejecting it downstream. A common mistake is a downstream Inventory service consuming an `OrderCreated` event, checking its database, realizing the item is out of stock, and "rejecting" the event by throwing an error and dropping it. You cannot reject an event. The order *was* created. It is a historical fact. If the inventory is empty, the Inventory service must accept the `OrderCreated` event, and then emit a *new* event: `OrderFailedDueToInventory`. You cannot change the past; you can only append compensating events to the future
