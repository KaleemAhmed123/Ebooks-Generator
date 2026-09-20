## Finding the seams

- You find service boundaries by looking for data that changes together and data that is written by a single actor. If a user action always requires updating Table A and Table B in a transaction, they belong in the same service
- Event storming is a popular technique to find these seams. You map out the domain events (e.g., `OrderPlaced`, `PaymentFailed`) on a whiteboard. Clusters of highly cohesive events naturally form your bounded contexts

| Splitting by Noun (Anti-pattern) | Splitting by Capability (Better) |
|---|---|
| `UserService` (CRUD for users) | `IdentityService` (login, auth) |
| `OrderService` (CRUD for orders) | `CheckoutService` (cart → payment → order) |
| `ProductService` (CRUD for products) | `CatalogService` (search, pricing, availability) |
| All services call each other constantly to do anything | Services own an end-to-end business capability |

### The failure

- The classic failure is splitting a system by noun. A developer builds a `UserService` that simply wraps a `users` table with a REST API
- Because the `UserService` has no business logic, the real logic bleeds into the callers. The `OrderService` has to orchestrate the `UserService` and the `ProductService` to complete a checkout. You have built an entity-relationship diagram over HTTP, maximizing network hops and latency
