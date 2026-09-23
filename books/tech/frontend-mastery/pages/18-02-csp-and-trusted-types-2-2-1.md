## Content Security Policy and Trusted Types - continued

```ts
// proxy.ts
import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID();
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join('; ');

  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

The nonce must be **new on every request**. A nonce baked into a static file at build time is a fixed password an attacker can read from the page source.

`'strict-dynamic'` says: a script I trusted may load further scripts. That is what lets a nonce-approved bundle load its own chunks without you listing every hash.

### Ship it in report-only first

A CSP that is slightly too strict breaks the site silently. `Content-Security-Policy-Report-Only` enforces nothing and sends a JSON report for every violation, so you can find the third party widget you forgot before it takes down checkout.

```
Content-Security-Policy-Report-Only: default-src 'self'; report-to csp-endpoint
```

Run report-only for a week, read the reports, fix the real gaps, then switch the header name.
