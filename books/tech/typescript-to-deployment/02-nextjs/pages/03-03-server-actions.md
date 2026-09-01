## Server Actions

- Changing data from the browser normally means writing an API route, then writing a `fetch` to call it, then keeping the two in step
- Both halves exist only to move one function call across the network
- A **Server Action** removes the boilerplate. You write the function, mark it to run on the server, and import it in a component
- Next.js does not ship that function to the browser. It ships an identifier and generates an endpoint for it
- Calling it looks like a function call and is actually an HTTP POST, which is convenient and is also the thing people forget

```ts
// app/actions/orders.ts
"use server"

export async function cancelOrder(orderId: string) {
  await db.orders.update({
    where: { id: orderId },
    data: { status: "cancelled" },
  })
}
```

```tsx
"use client"
import { cancelOrder } from "@/app/actions/orders"

export function CancelButton({ orderId }: { orderId: string }) {
  return <button onClick={() => cancelOrder(orderId)}>Cancel</button>
}
```

### What actually happens

- Next.js does not send `cancelOrder` to the browser
- It sends an id, and generates a POST endpoint for it
- The click is an HTTP request. The framework wrote the route for you
