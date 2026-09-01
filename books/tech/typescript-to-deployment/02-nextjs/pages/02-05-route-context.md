## Typing the handler with `RouteContext`

- Writing `{ params: Promise<{ orderId: string }> }` by hand drifts from the folder name
- Next.js generates the types from your routes instead

```bash
npx next typegen
```

- Types are also generated during `next dev` and `next build`

```ts
import type { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/orders/[orderId]">
) {
  const { orderId } = await ctx.params
  return Response.json({ orderId })
}
```

- `RouteContext` is global. You do not import it
- The route literal is checked. Rename the folder and this line fails to compile
- There are matching helpers for pages and layouts, `PageProps` and `LayoutProps`
