# Module 11 - The five questions and the trade-off map

## The five questions

- Every system design is an assembly of building blocks: databases, queues, caches, load balancers, services. You cannot know if an assembly works until you ask five questions of it
- These questions tie together everything in this booklet:

| Question | What it reveals |
|---|---|
| **1. Where is the state?** | Durability, consistency, and what a crash destroys |
| **2. Who owns the state?** | Bottlenecks, race conditions, and boundaries |
| **3. What if a node dies?** | The availability strategy (replica, failover, or downtime) |
| **4. What if a message is duplicated?** | The idempotency strategy |
| **5. What if communication fails?** | The timeout, retry, and fallback strategy |

- A design that draws boxes with lines between them is a whiteboard drawing. A design that answers these five questions is an architecture

### The failure

- A team spends three weeks debating GraphQL vs REST, and zero minutes debating what happens when the payment service times out. The API protocol does not matter if the system double-charges customers because it failed to answer Question 4
- The infrastructure tools you choose (Kafka, Postgres, Redis) are just implementations. The five questions are the physics of the system. You must answer them no matter what tools you use
