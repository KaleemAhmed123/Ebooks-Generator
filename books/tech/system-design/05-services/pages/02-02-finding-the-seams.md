## Finding the seams

- A seam is where the system can be cut without cutting a transaction. Two tests find it: data that changes together in one user action belongs together, and data that has one writer belongs with that writer. Everything on the same side of both tests is one service; a cut anywhere else needs a saga (page 7)
- **Event storming** is the whiteboard form: write every domain event, `OrderPlaced`, `PaymentCaptured`, `StockReserved`, in time order, then the command that caused each and the actor who issued it. Events that share an actor and change together cluster; the clusters are the candidate contexts, and the arrows between clusters are the contracts (Module 5)

| Split by noun | Split by capability |
| :--- | :--- |
| `UserService`: CRUD over the `users` table | `Identity`: sign up, sign in, sessions, password reset |
| `OrderService`: CRUD over `orders` | `Checkout`: cart → payment → order, one transaction, one owner |
| `ProductService`: CRUD over `products` | `Catalog`: search, pricing, availability, the read model the storefront needs |
| every user action calls three services and orchestrates them from the caller | a user action lands in one service that owns its whole path |
| a checkout is `Order → User → Product → Order` over HTTP: four hops (Module 1, page 5) | a checkout is one call to `Checkout`, which owns the order |

- The capability column is what event storming produces: `Checkout` owns every event from `CartCreated` to `OrderPlaced`; `Identity` owns `UserRegistered` and `SessionStarted`; the arrow between them is one id. A noun split produces a service per table, which is an entity-relationship diagram served over HTTP
- Seams move: promotions leaves `Checkout` the day a second team owns it or its write rate diverges (Module 1, page 4); the modular monolith (Module 1, page 2) is where that move is cheap

### The failure

- Splitting by noun. `UserService` wraps a table and holds no rules, so the rules bleed into every caller; a checkout orchestrates three services from the outside and pays three hops for a transaction it cannot have. The test for a proposed service: name a business action it completes alone. If the answer is "it stores users", it is a table, not a service
