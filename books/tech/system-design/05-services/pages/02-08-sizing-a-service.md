## How big is a service

- "Micro" is a terrible prefix. It makes engineers think the goal is a small number of lines of code. The goal is independent deployability and domain cohesion
- A service must be as large as its consistency boundary. If two pieces of data must always be updated atomically, they belong in the same service, even if that makes the service larger
- A service should be small enough that a single team can own it, understand it, and operate it. The "two-pizza team" rule (6–10 people) is about ownership capacity, not code size

:::interview
**Align with the team**
When sizing a service in an interview, do not quote lines of code. Quote Conway's Law. Say: "I would size the service so that one team can comfortably own the on-call rotation and the roadmap for this boundary."
:::

### The failure

- The failure mode is the "nano-service". Teams split logic into 40 tiny functions, each running as a separate HTTP service, often wrapping single database tables
- You now need distributed tracing just to debug a simple CRUD operation. A single feature requires deploying 6 different services in a specific order. You have maximized the distributed systems tax for zero benefit
