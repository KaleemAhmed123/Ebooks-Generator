## Environments and configuration

- An **environment** is a complete running copy of the system with its own data. Production, staging, and usually a preview per pull request
- They exist so a change can be observed somewhere real before it reaches users

| Environment | Data | Who sees it |
|---|---|---|
| local | disposable, seeded | you |
| preview | disposable, per branch | the reviewer |
| staging | production-like, never real customer data | the team |
| production | real | everyone |

### Validate configuration at boot, not on first use

```ts
import { z } from "zod"

const Env = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32),
})

export const env = Env.parse(process.env)
```

- **A missing variable should crash the process at startup**, loudly, before it accepts a single request
- The alternative is discovering it at 2am when the one endpoint that reads it is finally called
