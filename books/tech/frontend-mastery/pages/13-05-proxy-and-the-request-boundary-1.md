## `proxy.ts` and the Request Boundary

Some logic has to run before a page renders. Redirect a signed out user to the login screen. Rewrite `/blog` to `/en/blog` based on the browser's language header. Attach a request id to every response. There is no component to hang that on, because it must happen before Next.js has decided which component to render at all.

Next.js calls that layer `proxy.ts`. Through version 15 the file was called `middleware.ts`, and the rename in version 16 was not cosmetic.

### Why the name changed

"Middleware" is a word from Express, where it means "code that runs between the request and the handler, in a chain, with `next()`." Next.js middleware was never that. It runs once, at the network edge, before routing, and it can only redirect, rewrite, or set headers. People kept trying to use it for authorization logic and database calls, which it is bad at.

`proxy.ts` names it for what it is: the boundary where a request arrives and gets pointed somewhere. It also runs on the **Node runtime**, which the old edge-only version did not, so ordinary Node libraries work.

```ts
// proxy.ts, at the project root
import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
```

Migration is a rename and nothing else: `middleware.ts` becomes `proxy.ts`, and the exported `middleware` function becomes `proxy`. The body is unchanged. `middleware.ts` still works for edge runtime cases but is deprecated and will be removed.
