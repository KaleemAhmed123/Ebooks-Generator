## Cookies and headers

- Both come from `next/headers` and both are async in Next.js 16

```ts
import { cookies, headers } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  const headerList = await headers()
  const referer = headerList.get("referer")
}
```

### Writing them back

- The `headers()` object is **read only**
- To set a header, return a `Response` that carries it

```ts
return new Response("ok", {
  status: 200,
  headers: { "x-request-id": requestId },
})
```

- Cookies can be set through the store, or with a `Set-Cookie` header

```ts
const cookieStore = await cookies()
cookieStore.set("session", token, { httpOnly: true, sameSite: "lax" })
```

- `httpOnly` keeps the value out of reach of JavaScript in the browser. Use it for anything that authenticates
