## What `proxy.ts` is for, and what it is not

### Good uses

- Redirect an unauthenticated request before any page renders
- Rewrite a path, for example tenant subdomains to `/t/[tenant]`
- Attach a correlation id header that every downstream handler can log
- Set CORS headers in one place instead of on every route
- Pick a locale from the `Accept-Language` header

### Bad uses

- **Real authorization.** Checking a cookie exists is not checking a permission
- **Database queries.** It runs on every matched request, including prefetches
- **Anything slow.** Its latency is added to every single request

### The mistake worth naming

- A cookie in `proxy.ts` tells you a session probably exists
- It does not tell you the session is valid, unexpired, or allowed to touch this order
- Verify the token and check the row in the handler or the action, where the data is
- The proxy is a cheap early exit, not a security boundary
