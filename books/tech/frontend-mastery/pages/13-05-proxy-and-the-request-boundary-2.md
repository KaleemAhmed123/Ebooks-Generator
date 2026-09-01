### The `matcher` is not optional in practice

Without a `matcher`, the proxy runs on every request, including every image, font, and static chunk. That is measurable latency on assets that needed none. Always scope it.

### What does not belong here

The proxy runs on **every matched request**, before any caching. Anything slow in it is slow for the entire site.

- **Do not query a database.** Read the cookie, check that it exists, and let the page do the real lookup.
- **Do not verify a JWT signature** if it needs a network call to fetch keys. Check the cookie is present, and verify properly in the layout or route handler.
- **Do not put your authorization rules here alone.** A proxy check is a redirect for convenience. The real check belongs next to the data, in the Server Component or Server Action that reads it. Anyone can call a route handler directly.

Treat the proxy as a signpost, not a lock.

### What belongs here

- Redirecting on a missing session cookie.
- Locale detection and rewriting.
- A/B test bucketing by setting a cookie.
- Attaching a request id or security headers to every response.
- Geographic or bot based routing.

### Setting headers for every page

Security headers are the clearest fit, because they apply to everything and cost nothing to add.

```ts
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}
```

For headers that never change per request, `next.config.ts` has a `headers()` option that does the same job without running any code. Use the proxy only when the value depends on the request.
