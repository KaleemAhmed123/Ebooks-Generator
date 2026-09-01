## AsyncLocalStorage in practice

```js
// context.js
import { AsyncLocalStorage } from "node:async_hooks"

export const context = new AsyncLocalStorage()

export function getRequestId() {
  return context.getStore()?.requestId
}
```

```js
// server.js
import { randomUUID } from "node:crypto"
import { context } from "./context.js"

app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"] ?? randomUUID()
  context.run({ requestId }, next)
})
```

```js
// logger.js
import { getRequestId } from "./context.js"

export function log(message) {
  console.log(JSON.stringify({ requestId: getRequestId(), message }))
}
```

- `context.run(store, fn)` starts a scope. Everything `fn` triggers can read that store
- Concurrent requests each get their own. A module-level variable would leak one request's id into another
