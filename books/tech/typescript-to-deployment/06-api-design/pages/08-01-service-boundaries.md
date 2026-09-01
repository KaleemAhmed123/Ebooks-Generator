# Module 8 - Service boundaries

## Where to draw the line

- A monolith is one deployable unit. Microservices are many. The choice is usually made for the wrong reasons
- Splitting does not make code better. It converts **method calls into network calls**, and a network call can be slow, fail, or arrive twice
- What it buys is independent deployment, independent scaling and independent failure. Those are the only real benefits
- Pay for them only when you need them

| | Monolith | Modular monolith | Microservices |
|---|---|---|---|
| Deploy | one unit | one unit | many |
| Boundaries | often none | enforced in code | enforced by the network |
| Transactions | real ones | real ones | sagas |
| Debugging | a stack trace | a stack trace | distributed tracing |
| Scaling | all of it together | all of it together | per service |
| Team size that fits | 1 to 15 | 5 to 40 | many teams |

### The modular monolith is usually the right answer

- Modules with explicit interfaces, each owning its own tables, and no module reaching into another's data
- Every architectural benefit of separation, with none of the network in the middle
- And when one module genuinely needs to be extracted later, the boundary already exists

### The failure to avoid

- A **distributed monolith**: services that must be deployed together, share a database, and call each other synchronously in a chain
- Every cost of distribution and none of the benefits, and it is what splitting by technical layer rather than by domain produces
