# Module 5 - API security

## What actually gets exploited

- An API has no interface to hide behind. Every endpoint is documented by its own responses, and a caller can send anything
- The OWASP API Top 10 is the useful list because it is drawn from real incidents rather than theory

| Risk | What it looks like |
|---|---|
| Broken object authorization | changing an id in the URL returns someone else's record |
| Broken authentication | weak login, no rate limit, tokens that never expire |
| Broken property authorization | a user updates a field they should not control |
| Unrestricted resource consumption | no rate limit, no page size cap, no upload cap |
| Broken function authorization | an admin endpoint reachable by a normal user |
| Unrestricted access to sensitive flows | buying out stock, brute forcing coupons |
| Server side request forgery | your server fetches a URL the caller chose |
| Security misconfiguration | debug on, stack traces returned, CORS wide open |
| Inventory management | a forgotten `/v1` still running unpatched |
| Unsafe third-party APIs | trusting an upstream response without validating it |

### The pattern across all of them

- Almost none are clever exploits. They are missing checks on endpoints that work correctly for honest callers
- Which is why they survive code review, and why testing with a second account finds more than reading the code does
