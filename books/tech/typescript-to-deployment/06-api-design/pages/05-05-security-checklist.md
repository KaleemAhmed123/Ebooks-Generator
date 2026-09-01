## The checklist

### Before the handler

- TLS everywhere, with HSTS. No plaintext fallback
- Security headers set by `helmet`, and `x-powered-by` disabled
- Body size capped per route, not only globally
- Rate limits tiered by cost, backed by a shared store
- CORS restricted to known origins

### In the handler

- Every input parsed into a schema you defined. Unknown keys dropped, never spread into a write
- Every id scoped to the caller in the `where` clause
- Every outbound response built from an explicit shape, never a raw database row
- No caller-supplied URL fetched without an allowlist and a private-range check

### Around the edges

- Secrets from a secret manager, never from the repository, never in a `NEXT_PUBLIC_` variable
- Audit records for anything touching money, permissions or personal data
- Errors that never return a stack trace or SQL text to a caller
- Dependencies audited, and old API versions decommissioned rather than left running

### The two tests worth automating

- **A second account.** Log in as seller B and request every one of seller A's ids. Any 200 is a finding
- **No token at all.** Call every endpoint unauthenticated. Anything but a 401 is a finding
- Both are cheap to write, and between them they catch most of the OWASP list
