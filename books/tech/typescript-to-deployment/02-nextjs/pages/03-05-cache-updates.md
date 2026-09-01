## Telling the cache something changed

- After a Server Action writes, the cached data is stale
- Next.js 16 gives three functions, and they are not interchangeable

```ts
"use server"
import { revalidateTag, updateTag, refresh } from "next/cache"
```

### `updateTag` - the user must see it now

```ts
export async function updateShopName(sellerId: string, name: string) {
  await db.sellers.update({ where: { id: sellerId }, data: { name } })
  updateTag(`seller-${sellerId}`)
}
```

- Expires and refreshes inside the same request
- The user sees their own change immediately. Use it for forms and settings

### `revalidateTag` - a short delay is fine

```ts
export async function publishProduct(productId: string) {
  await db.products.update({ where: { id: productId }, data: { live: true } })
  revalidateTag("catalog", "max")
}
```

- Marks it stale. Readers get the old copy while a fresh one loads

:::note
**Changed in Next.js 16.** `revalidateTag` now takes a second argument, a `cacheLife` profile such as `"max"`. The one-argument form is deprecated and is a TypeScript error. `updateTag` and `refresh` are new, and both are Server Action only.
:::
