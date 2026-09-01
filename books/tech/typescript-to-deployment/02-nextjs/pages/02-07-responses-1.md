## Returning a response

- There is no `res.send`. You return a `Response` object

```ts
// JSON with a status
return Response.json({ error: "not_found" }, { status: 404 })

// plain text
return new Response("ok", { status: 200 })

// no content
return new Response(null, { status: 204 })
```

### Redirects

```ts
import { redirect } from "next/navigation"

export async function GET() {
  redirect("https://example.com/orders")
}
```

- `redirect` throws internally to stop the handler. Nothing after it runs
