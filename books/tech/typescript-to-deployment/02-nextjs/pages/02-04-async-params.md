## Dynamic segments and async `params`

- A folder in square brackets becomes a URL parameter

```
app/api/orders/[orderId]/route.ts   ->  /api/orders/:orderId
```

- The second argument carries `params`
- In Next.js 16 `params` is a **promise**. You must await it

```ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params
  return Response.json({ orderId })
}
```

### What the shapes look like

| Route | URL | `params` resolves to |
|---|---|---|
| `[orderId]/route.ts` | `/orders/o1` | `{ orderId: "o1" }` |
| `[shop]/[item]/route.ts` | `/s1/i2` | `{ shop: "s1", item: "i2" }` |
| `[...slug]/route.ts` | `/a/b` | `{ slug: ["a", "b"] }` |

:::note
**Breaking change in Next.js 16.** Synchronous access is gone. `params`, `searchParams`, `cookies()`, `headers()` and `draftMode()` are all async now. Version 15 allowed the sync form during a compatibility period. That period is over. Run `npx @next/codemod@canary next-async-request-api .` on an older codebase.
:::
