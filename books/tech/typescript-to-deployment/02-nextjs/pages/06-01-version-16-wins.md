# Module 6 - Version 16 wins most people missed

## Types generated from your routes

- Route strings are the last untyped thing in most Next.js apps
- `next typegen` fixes it, and it already runs during `dev` and `build`

```ts
export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/orders/[orderId]">
) {
  const { orderId } = await ctx.params
}
```

- Rename the folder and this stops compiling
- `PageProps<"/sellers/[id]">` and `LayoutProps` do the same for pages and layouts
- All three are global. No import

## Concurrent dev and build

- `next dev` and `next build` now write to separate output directories
- `next dev` goes to `.next/dev`
- You can run a production build while the dev server is still up, which used to corrupt `.next`
- A lockfile stops two `next dev` processes fighting over the same project
