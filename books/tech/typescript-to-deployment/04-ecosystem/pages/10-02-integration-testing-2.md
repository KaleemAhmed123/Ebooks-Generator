### mongodb-memory-server

```ts
const mongod = await MongoMemoryServer.create()
await mongoose.connect(mongod.getUri())
```

- A real MongoDB in memory, no Docker needed. Faster than Testcontainers and easier in CI
- Start it as a replica set if the code under test uses transactions

### msw 2.15.0, for outbound calls

```ts
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"

const server = setupServer(
  http.post("https://api.shiprocket.in/orders", () =>
    HttpResponse.json({ awb: "AWB123" })
  )
)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
```

- Intercepts at the network layer, so `fetch`, `axios` and `undici` are all covered without knowing which one you used
- `onUnhandledRequest: "error"` fails the test on a real outbound call, which is how you find the one you forgot to stub
