### Why `app.ts` and `index.ts` are separate

```js
// app.ts
export const app = express()

// index.ts
import { app } from "./app.js"
const server = app.listen(env.PORT)
```

- Tests import `app` and never open a port

```js
import request from "supertest"
import { app } from "../app.js"

await request(app).get("/orders/o1").expect(200)
```

### The rule that keeps it clean

- A **service** never sees `req` or `res`
- If it needs the user, pass the user, not the request
- That is what makes the same logic callable from a queue worker or a cron job
