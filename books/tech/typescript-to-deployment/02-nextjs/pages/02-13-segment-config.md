## Route segment config

- Exported constants that change how a route behaves
- They work in `route.ts`, `page.tsx` and `layout.tsx`

```ts
export const dynamic = "auto"
export const dynamicParams = true
export const revalidate = false
export const fetchCache = "auto"
export const runtime = "nodejs"
```

| Option | What it controls |
|---|---|
| `dynamic` | force static or force dynamic rendering |
| `dynamicParams` | whether unknown params render on demand or 404 |
| `revalidate` | seconds before cached output is refreshed |
| `fetchCache` | default caching for `fetch` inside this segment |
| `runtime` | `nodejs` or `edge` |

### The one you will actually use

```ts
export const revalidate = 60

export async function GET() {
  const sellers = await db.sellers.findMany()
  return Response.json(sellers)
}
```

- The response is cached and refreshed at most once a minute

:::note
`GET` handlers were cached by default until Next.js 15. They are **dynamic by default now**. If you upgraded and your endpoint suddenly hits the database on every request, this is why.
:::
