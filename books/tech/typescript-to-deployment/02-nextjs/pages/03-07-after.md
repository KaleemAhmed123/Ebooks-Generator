## Work after the response

- Logging an analytics event, writing an audit row or warming a cache should not make the user wait
- Doing it before returning adds its latency to every request. Doing it without awaiting risks the function being frozen the moment the response is sent
- On a serverless platform that is a real failure. The instance can be suspended immediately after the response, and unawaited work simply never completes
- **`after()`** schedules a callback to run once the response has been sent, and keeps the invocation alive until it finishes

```ts
import { after } from "next/server"

export async function POST(request: Request) {
  const order = await createOrder(await request.json())

  after(async () => {
    await analytics.track("order_created", { orderId: order.id })
    await db.audit.create({ data: { action: "order.created", orderId: order.id } })
  })

  return Response.json({ data: order }, { status: 201 })
}
```

- The caller gets the response immediately, and the work still runs
- It works in Route Handlers, Server Actions, Server Components and middleware

### What it is not

- **Not a queue.** There is no retry, no persistence and no visibility. A failure inside it is lost
- Right for fire-and-forget telemetry, wrong for anything that must happen
- Anything that must happen belongs in a queue, or in the same transaction as the write
