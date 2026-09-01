## `cacheComponents`

- Opt in per app, in the config

```ts
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

### What it changes

- A single page can be part static and part dynamic
- The static shell is served immediately, and the dynamic parts stream in behind `<Suspense>`

```tsx
export default function OrderPage() {
  return (
    <>
      <Header />                        {/* static, prerendered */}
      <Suspense fallback={<Spinner />}>
        <LiveShipmentStatus />          {/* dynamic, streams in */}
      </Suspense>
    </>
  )
}
```

- Previously you got one or the other for the whole route

### Before you turn it on

- It replaces the old `experimental.ppr`, `experimental.dynamicIO` and `experimental.useCache` flags, which were all removed
- It is not a rename. Uncached data outside a `<Suspense>` boundary becomes a **build error**
- Turning it on midway through a project is a migration, not a config change
