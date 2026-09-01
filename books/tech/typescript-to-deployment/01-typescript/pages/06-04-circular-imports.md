## Circular imports

- Two modules that import each other
- TypeScript allows it. Node does not always survive it

```ts
// user.ts
import { Order } from "./order.js"
export class User { orders: Order[] = [] }

// order.ts
import { User } from "./user.js"
export class Order { user!: User }
```

### Why it usually still works

- If the cycle only involves **types**, it disappears at build time
- Use `import type` and the cycle never reaches the runtime

```ts
import type { Order } from "./order.js"
```

### Why it sometimes breaks

- If the cycle involves **values**, meaning a class, a constant, or a function called at module load, then one side gets a half-initialized module

```bash
TypeError: Cannot read properties of undefined (reading 'prototype')
ReferenceError: Cannot access 'User' before initialization
```

### How to get out of it

- Make it types-only with `import type`
- Or pull the shared piece into a third module both can import
- Or move the value access inside a function, so it runs after both modules have loaded
