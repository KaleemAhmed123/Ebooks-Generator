## Reading the request

- The `request` argument is a `NextRequest`, which extends the Web `Request`
- Everything you already know about `Request` works

### JSON body

```ts
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ received: body })
}
```

### Form data

```ts
export async function POST(request: Request) {
  const form = await request.formData()
  const name = form.get("name")     // "kaleem"
  const email = form.get("email")
  return Response.json({ name, email })
}
```

- Every `formData` value is a string. Validate and coerce before you trust it

### Query parameters

```ts
import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")
  // /api/search?q=mug  ->  "mug"
}
```

- `nextUrl` is the parsed URL that `NextRequest` adds on top of the Web `Request`
