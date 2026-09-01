## Validation alternatives

### Valibot 1.4.2

```ts
import * as v from "valibot"

const Order = v.object({ id: v.string(), total: v.number() })
v.parse(Order, input)
```

- Same idea as Zod, built so bundlers can drop what you do not import
- Roughly a tenth of the bundle size. Matters on edge and serverless, less on a long-running server

### ArkType 2.2.3

```ts
import { type } from "arktype"

const Order = type({ id: "string", "total": "number>0" })
```

- Validation written as TypeScript-looking strings, parsed at the type level
- The fastest of the three at runtime. The syntax is unusual until it clicks

### TypeBox 0.34

```ts
import { Type } from "@sinclair/typebox"

const Order = Type.Object({ id: Type.String(), total: Type.Number() })
```

- Produces **actual JSON Schema**, which is why Fastify pairs with it
- Reach for it when the schema must be JSON Schema, not just behave like it
