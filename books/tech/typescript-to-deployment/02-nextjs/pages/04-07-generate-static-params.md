## Prerendering dynamic routes

- A dynamic route such as `/products/[slug]` has no fixed set of pages, so by default each one is rendered when it is requested
- For a catalog of ten thousand products where each page is identical for everyone, that is ten thousand renders that could have been done once
- **`generateStaticParams`** tells Next.js which values exist, so those pages are built ahead of time and served as static files

```ts
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { slug: true } })
  return products.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params
  const product = await db.product.findUnique({ where: { slug } })
  return <ProductView product={product} />
}
```

### Values that did not exist at build time

```ts
export const dynamicParams = true    // render on demand, then cache. The default
export const dynamicParams = false   // anything not listed returns 404
```

- `true` is **incremental static regeneration**: the first request for a new slug renders it, and every request after is served from cache
- That is how a catalog stays static without rebuilding the whole site when one product is added

### Keeping it fresh

```ts
export const revalidate = 3600        // rebuild at most hourly
```

- Or invalidate precisely from a Server Action with `revalidateTag`, which is covered in Module 3
- **Do not prerender ten thousand pages if only fifty are visited.** Return the popular slugs and let the rest render on demand
