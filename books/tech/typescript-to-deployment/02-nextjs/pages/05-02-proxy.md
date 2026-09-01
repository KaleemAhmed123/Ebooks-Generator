## `proxy.ts`, formerly middleware

- Some logic has to run before routing decides anything: rejecting a request with no session, rewriting a tenant subdomain, picking a locale
- Putting it in every route means repeating it and eventually forgetting it on the one route that mattered
- Next.js runs one file for every matched request before the router sees it, which is where that logic goes
- It was called `middleware` and is now called `proxy`, a rename meant to make its job clearer: it sits at the network boundary and routes
- Because it runs on every request including prefetches, it has to be fast, and anything slow there is added to every page load

```ts
// proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")

  if (!session && request.nextUrl.pathname.startsWith("/seller")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/seller/:path*", "/admin/:path*"],
}
```

- `matcher` limits which paths it runs on. Without it, it runs on everything including static assets

:::note
**Renamed in Next.js 16.** `middleware.ts` is deprecated, the file is now `proxy.ts` and the exported function is `proxy`. Config flags renamed too, so `skipMiddlewareUrlNormalize` is now `skipProxyUrlNormalize`. The important part: **`proxy` runs on the Node runtime only and this cannot be configured.** Edge is not supported there. If you need Edge, stay on `middleware.ts` for now.
:::
