## Environment variables

- Two kinds, and the difference is not a convention. It is enforced

```bash
# .env.local
DATABASE_URL="postgres://..."          # server only
NEXT_PUBLIC_API_URL="/api"             # sent to the browser
```

- Anything prefixed `NEXT_PUBLIC_` is **inlined into the client bundle at build time**
- Everything else is unavailable in Client Components. Reading it there gives `undefined`

### Never prefix a secret

- `NEXT_PUBLIC_STRIPE_SECRET_KEY` is a published secret. The value is in the JavaScript anyone can read
- Publishable keys are fine. Secret keys are not

### Reading a variable at runtime, not build time

- Values read during a build are baked into the output
- To read the actual value at request time, force the route dynamic first

```ts
import { connection } from "next/server"

export default async function Page() {
  await connection()
  const region = process.env.DEPLOY_REGION
}
```

:::note
**Removed in Next.js 16.** `serverRuntimeConfig` and `publicRuntimeConfig` are gone, along with `getConfig()` from `next/config`. Use environment variables and `connection()` instead.
:::
