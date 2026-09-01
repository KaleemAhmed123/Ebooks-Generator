## Typed environment config

- `process.env` is typed as `Record<string, string | undefined>`
- Every value is a string, and every value might be missing

```ts
const port = process.env.PORT
// string | undefined

app.listen(port)   // silently wrong if PORT was never set
```

### Validate it once, at boot

```ts
import { z } from "zod"

const Env = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string(),
})

export const env = Env.parse(process.env)
```

- `z.coerce.number()` turns the string `"3000"` into the number `3000`
- `parse` throws here on purpose - a misconfigured server should refuse to start

```ts
env.PORT        // number
env.NODE_ENV    // "development" | "production" | "test"
```

### Why fail at boot and not at first request

- A missing variable is a deployment problem, not a user problem
- Crashing on startup means your rollout fails and the old version keeps serving
- Failing on the first request means you shipped a broken service and found out from a customer
