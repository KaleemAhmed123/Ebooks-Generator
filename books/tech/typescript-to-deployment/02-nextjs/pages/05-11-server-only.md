## Keeping server code off the client

- A Server Component and a Client Component are both just files, and an accidental import is all it takes to send server code to the browser
- A helper that reads `process.env.DATABASE_URL`, imported by a Client Component, ships that module in the bundle
- Nothing warns you. The build succeeds and the secret is in the JavaScript

```bash
npm i server-only client-only
```

```ts
// lib/db.ts
import "server-only"

export const db = new PrismaClient()
```

- Importing that file from a Client Component is now a **build error**, not a silent leak
- `client-only` does the reverse, so a module using `window` fails loudly if a Server Component imports it

### The taint API

```ts
import { experimental_taintObjectReference as taint } from "react"

const user = await db.user.findUnique({ where: { id } })
taint("do not pass the full user to the client", user)
```

- Marks a value so passing it to a Client Component throws instead of serializing
- Useful for a whole database row, where the risk is passing the object rather than importing the module

### The habit that avoids all of it

- Never pass a database row straight to a Client Component. Map it to an explicit shape first
- The same rule as never returning a raw row from an API, and for the same reason
