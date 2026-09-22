## The modular monolith

- A **modular monolith** is one process whose modules, `billing`, `inventory`, `orders`, each expose a small public API, own their tables, and may not reach into each other's internals. The boundary is enforced by the compiler and the linter, not by a diagram, and a call across it is still a function call: no network, no partial failure, one transaction
- Each module's schema is its own: `billing` may not join `orders.items` even though the table is a millimetre away. Reads across modules go through the other module's API, exactly as they would across a network (Module 2), which is what makes a later extraction a mechanical change rather than a rewrite

```javascript
// eslint.config.js: the boundary is a build failure, not a convention
export default [{
  files: ["src/**/*.ts"],
  rules: {
    "no-restricted-imports": ["error", { patterns: [
      { group: ["@app/*/internal/*", "@app/*/db/*"],
        message: "import a module's public API (@app/<module>) only" },
    ] }],
  },
}];
```

```typescript
// src/orders/place.ts — allowed: public APIs; one local transaction spans all three
import { chargeCard } from "@app/billing";
import { reserveStock } from "@app/inventory";
export const placeOrder = (user: string, cart: Cart) => db.transaction(async (tx) => {
  await reserveStock(cart.items, tx); await chargeCard(user, cart.total, tx);
  return insertOrder(user, cart, tx);      // orders' own table
});
```

- `tsconfig` `paths` maps `@app/billing` to `src/billing/index.ts`, so the public API is a file, and the lint rule makes every other path inside a module unreachable. When `billing` must become a service, its callers already speak to one entry point

### The failure

- Boundaries that exist in the diagram and not in the compiler. A hurried change imports `@app/billing/db/invoices` or joins another module's table, the build passes, and six months later the "modules" are one tangle with a folder structure. If nothing fails when a boundary is crossed, there is no boundary
