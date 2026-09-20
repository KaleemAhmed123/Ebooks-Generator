## The workload decides

- The choice between a monolith and microservices is not about which is "better" or more modern. It is an engineering trade-off driven by the workload and the organization
- A monolith minimizes latency and cognitive overhead. Microservices isolate deployments, failures, and scaling constraints

| Constraint | Monolith | Microservices |
|---|---|---|
| **Team size** | Best for 1–20 engineers. Everyone understands the whole system | Required for 50+ engineers. Teams need independent release cycles |
| **Scaling profile** | The whole system scales together. If video encoding needs CPU, the entire app scales up | Granular. You can scale the CPU-heavy encoder independently from the web tier |
| **Data models** | All data lives in one relational store. Simple joins and transactions | Services can choose different stores (e.g., Graph for recommendations, Relational for billing) |
| **Failure domain** | A memory leak in one module crashes the entire process | A memory leak crashes one service. The rest of the system stays up |
| **Latency** | Function calls take nanoseconds. No network unreliability | Network hops take milliseconds and introduce partial failure |

### The failure

- The classic failure is splitting a system into microservices before the domain is understood. Martin Fowler coined the "MonolithFirst" strategy: start with a monolith, find the natural boundaries as the system grows, and extract services only when the monolith becomes a bottleneck
- If you guess the boundaries wrong on day one, you will have to refactor across network calls, which is orders of magnitude harder than refactoring a single codebase
