## One definition, schema and type

- `zod` is a validation library - you describe the shape, it checks the value
- The clever part is that the **type is derived from the schema**

```ts
import { z } from "zod"

const User = z.object({
  name: z.string(),
  age: z.number().int().positive(),
})

type User = z.infer<typeof User>   // { name: string; age: number }
```

- `User` is now a schema **and** a type, written once
- `z.infer` reads the schema and produces the TypeScript type from it
- The two can never drift apart, because one is generated from the other

### Why this matters

- Hand-written types next to hand-written validators always drift
- One of them gets updated, the other does not, and nobody notices until production
