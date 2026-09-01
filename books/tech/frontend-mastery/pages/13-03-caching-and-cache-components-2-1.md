### The Next.js 16 model

Every piece of dynamic code in a page, layout, or route handler runs **at request time**. Nothing is cached unless you say so. You opt in with the `"use cache"` directive.

```ts
// next.config.ts
const nextConfig = {
  cacheComponents: true,
};
export default nextConfig;
```

Then mark whatever should be cached.

```tsx
async function ProductGrid({ category }: { category: string }) {
  'use cache';
  const products = await db.products.findMany({ where: { category } });
  return <Grid items={products} />;
}
```

The compiler generates the cache key from the arguments, so `category: 'shoes'` and `category: 'hats'` get separate entries automatically. You do not build the key yourself and cannot get it wrong.

`"use cache"` works at three levels: on a whole file, on a component, or on a single async function.

### How long the cache lives

`cacheLife` sets the profile. The built-in names go from `'seconds'` up to `'max'`, or you can pass exact numbers.

```tsx
import { cacheLife, cacheTag } from 'next/cache';

async function BlogPost({ slug }: { slug: string }) {
  'use cache';
  cacheLife('hours');
  cacheTag(`post-${slug}`);

  return <Article post={await db.posts.find(slug)} />;
}
```

`cacheTag` labels the entry so you can invalidate it by name later.
