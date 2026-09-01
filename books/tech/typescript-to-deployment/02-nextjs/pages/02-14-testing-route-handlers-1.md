## Testing route handlers

- A Route Handler is an exported function taking a `Request` and returning a `Response`, which makes it unusually easy to test
- No server needs to start, no port is opened, and no framework-specific test setup is required
- You construct a real `Request`, call the exported function, and assert on the real `Response`

```ts
import { describe, it, expect, vi } from "vitest"
import { POST } from "@/app/api/orders/route"

describe("POST /api/orders", () => {
  it("rejects a body with no seller", async () => {
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ totalPaise: 50000 }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
    expect(await res.json()).toMatchObject({ code: "validation_failed" })
  })
})
```

### Testing a handler with dynamic params

```ts
const res = await GET(req, { params: Promise.resolve({ orderId: "o_842" }) })
```

- `params` is a promise in Next.js 16, so the test has to hand over a promise too
