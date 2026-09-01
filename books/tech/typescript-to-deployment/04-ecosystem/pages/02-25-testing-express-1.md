## Testing an Express app

- `supertest` 7.2.2 starts the app on an ephemeral port, runs a real HTTP request, and shuts it down

```bash
npm i -D supertest
```

```js
import request from "supertest"
import { app } from "../app.js"

test("rejects an order with no seller", async () => {
  const res = await request(app)
    .post("/api/v1/orders")
    .send({ total: 500 })
    .expect(400)

  expect(res.body.code).toBe("validation_failed")
})

test("returns an order to its owner", async () => {
  const res = await request(app)
    .get("/api/v1/orders/o1")
    .set("Cookie", [`session=${token}`])
    .expect(200)

  expect(res.body.data.id).toBe("o1")
})
```

- Passing `app` rather than a URL is why `app.ts` and `index.ts` are separate files
- Nothing is mocked. Routing, middleware order, parsing and the error handler are all exercised
