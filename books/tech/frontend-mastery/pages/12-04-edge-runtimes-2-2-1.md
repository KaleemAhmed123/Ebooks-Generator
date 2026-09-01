### In Next.js

Next.js 16's `proxy.ts` runs on the **Node runtime**, which is the change from
earlier versions where middleware was edge-only. The rename in Module 13 made
that boundary explicit. `middleware.ts` still exists for edge use cases and is
deprecated.

Route handlers can still opt in per route:

```ts
// app/api/geo/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country') ?? 'US';
  return Response.json({ country });
}
```

Before you set that flag, check what the route imports. One transitive
dependency reaching for `fs` moves the failure to build time, which is the good
outcome, or to runtime, which is not.
