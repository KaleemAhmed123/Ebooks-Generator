## The modular monolith

- The modular monolith keeps the deployment simplicity of a single process but enforces strict boundaries internally. You split the codebase into distinct modules (like `billing`, `inventory`, `orders`), each with its own internal schema and API
- Modules communicate via in-memory function calls, not network hops. You get the logical separation of microservices without the distributed systems tax

````typescript
// Strict boundaries enforced by the compiler
import { chargeCard } from '@app/billing';
import { getStock } from '@app/inventory';

// A single transaction spanning logical modules
export async function placeOrder(userId: string, cart: Cart) {
  await db.transaction(async (trx) => {
    // These are local function calls, not network requests
    await getStock(cart.items, trx); 
    await chargeCard(userId, cart.total, trx);
    await createOrderRecord(userId, cart, trx);
  });
}
````

- To make this work, the boundaries must exist in the compiler, not just on a whiteboard. If code in `inventory` can directly import internal helpers from `billing`, you do not have a modular monolith. You have a coupled monolith

### The failure

- The failure mode is boundaries that exist only in diagrams. A developer in a hurry bypasses the module's public API and directly queries its database tables
- You prove the boundaries exist by using static analysis. Tools like `tsconfig.json` path mapping or ESLint's `no-restricted-imports` must fail the build if a module imports private code from another. The schema must be logically partitioned so one module cannot join tables owned by another
