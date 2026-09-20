## DLQ routing strategies

- When configuring Dead Letter Queues for a large system, how many should you create? 

| Strategy | Architecture | Pros / Cons |
|---|---|---|
| **Global DLQ** | All topics route to one single `global-dlq` topic. | Pros: Easy to monitor (one alert).<br>Cons: A schema-less nightmare. |
| **Per-Topic DLQ** | `orders` routes to `orders-dlq`. `users` routes to `users-dlq`. | Pros: Preserves schemas. Easy to replay safely.<br>Cons: Hundreds of topics to monitor. |
| **Per-Service DLQ** | All topics consumed by `Billing` route to `billing-dlq`. | Pros: Maps perfectly to team ownership. |

- The Per-Service (or Per-Consumer-Group) DLQ is usually the sweet spot. When an alert fires on `billing-dlq`, the Billing team knows it's their problem, regardless of which upstream topic the data came from.

### The failure

- Routing all topics to one global DLQ creates a dumping ground. If you dump `OrderCreated`, `UserDeleted`, and `InvoicePaid` events into a single `global-dlq`, you have created a topic with no defined schema. When it's time to replay the failed messages, how do you know where they should go? Replaying an `OrderCreated` event back into the `users` topic will crash the system all over again. A DLQ is only useful if you can easily replay the data back to its original destination
