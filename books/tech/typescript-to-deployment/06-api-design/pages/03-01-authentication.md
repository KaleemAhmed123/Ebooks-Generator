# Module 3 - Authentication

## Proving who is calling

- HTTP forgets everything between requests, so every single request has to carry proof of who is making it
- **Authentication** answers who you are. **Authorization**, the next module, answers what you may do
- Collapsing the two into one middleware is where most access bugs come from
- There are only a few ways to carry that proof, and each fits a different caller

| Mechanism | Carried as | Fits |
|---|---|---|
| Session cookie | a cookie holding an opaque id | your own browser client |
| Bearer token | `Authorization: Bearer <jwt>` | mobile apps, service to service |
| API key | a header, long lived | server-side partner integrations |
| OAuth access token | `Authorization: Bearer <token>` | third-party apps acting for a user |
| mTLS certificate | the TLS handshake itself | internal service to service, zero trust |

### The split that decides the rest

- **Stateful.** The server stores the session and hands out a meaningless id. Revoking is deleting a row
- **Stateless.** The token carries the claims and a signature. Anyone with the key verifies it without asking you
- Stateful gives instant revocation and needs a shared store. Stateless scales across services and cannot be un-issued
- Most real systems use both: a session cookie for the browser, tokens between services
