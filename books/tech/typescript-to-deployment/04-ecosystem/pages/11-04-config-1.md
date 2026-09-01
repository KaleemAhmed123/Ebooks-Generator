## Configuration

- A service needs values it cannot hardcode: a database URL, a secret, a port, a log level
- Those come from the **environment**, which is a set of key-value pairs the operating system hands the process
- That is deliberate. The same built artifact then runs in staging and production with no code change, which is the whole point of the twelve-factor rule
- Every value arrives as a **string**, and any of them can be missing, and `process.env.PORT` is happy to be `undefined`
- So the failure shows up much later, as a connection to `undefined`, or a port that is the string `"3000"` where a number was expected
- Validating the environment at boot converts that into a startup crash with the variable's name in it
- A service that refuses to start is a far better outcome than one that starts wrong and fails under load an hour later

### Validate it at boot

```ts
// config/env.ts
import { z } from "zod"

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
})

export const env = Env.parse(process.env)
```

- `parse`, not `safeParse`. A misconfigured service should refuse to start
- The process dies in the first second with a message naming the variable, instead of throwing a null pointer under load
- `env.PORT` is a `number` everywhere else in the codebase, already coerced
