## Request memoization

- The innermost layer, and the one you never configure
- Inside a single render, the same `fetch` call is only made once

```tsx
async function getSeller(id: string) {
  const res = await fetch(`https://api.internal/sellers/${id}`)
  return res.json()
}

// both call getSeller("s1"). Only one network request happens.
async function Header() { const s = await getSeller("s1") /* ... */ }
async function Sidebar() { const s = await getSeller("s1") /* ... */ }
```

- Deduplicated by URL and options
- It exists so you can fetch what a component needs where the component is, instead of threading props down

### Its limits

- One render pass only. It is gone the moment the response is sent
- It applies to `fetch`. A raw database client is not memoized
- To get the same effect for a database call, wrap it in React's `cache()`

```ts
import { cache } from "react"

export const getSeller = cache(async (id: string) => {
  return db.sellers.findUnique({ where: { id } })
})
```
