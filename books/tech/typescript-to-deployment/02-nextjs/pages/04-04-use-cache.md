## `use cache`

- `fetch` options only help when the work is a fetch
- `use cache` caches **any** async function, including a database query

```ts
export async function getSellerCatalog(sellerId: string) {
  "use cache"

  return db.products.findMany({ where: { sellerId } })
}
```

- The arguments become part of the cache key
- Two sellers get two entries, without you writing a key

### Controlling how long

```ts
import { cacheLife, cacheTag } from "next/cache"

export async function getSellerCatalog(sellerId: string) {
  "use cache"
  cacheLife("hours")
  cacheTag(`catalog-${sellerId}`)

  return db.products.findMany({ where: { sellerId } })
}
```

- `cacheLife` takes a profile: `seconds`, `minutes`, `hours`, `days`, `weeks`, `max`
- `cacheTag` gives it a label so a Server Action can invalidate exactly this entry

:::note
`cacheLife` and `cacheTag` are stable in Next.js 16. The `unstable_` prefix is gone, so `import { unstable_cacheLife as cacheLife }` can be simplified to a plain import.
:::
