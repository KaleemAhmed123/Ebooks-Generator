## OpenID Connect, API keys and mTLS

### OpenID Connect

- OAuth grants **access**. It never promised to tell you **who the user is**, and everyone used it for that anyway, incorrectly
- **OIDC** is a thin layer on top that adds identity properly
- It adds an **ID token**, a JWT describing the user, and a `/userinfo` endpoint
- Ask for the `openid` scope and you get one back alongside the access token
- The ID token is for **you**. The access token is for calling **their** API. Sending an ID token as a bearer credential is a common mix-up

```ts
const { payload } = await jwtVerify(idToken, jwks, {
  issuer: "https://accounts.google.com",
  audience: process.env.GOOGLE_CLIENT_ID,
})
if (payload.nonce !== expectedNonce) throw new Error("replay")
```

### API keys

- A long-lived secret string identifying an application rather than a user
- Right for server-to-server partner access, wrong for anything in a browser
- **Store a hash, not the key.** It is a credential, so it deserves the same treatment as a password
- Show it once at creation, prefix it so it can be spotted in a leaked log, and support two active keys so rotation needs no downtime

### Mutual TLS

- Normally only the server proves its identity. With **mTLS** the client presents a certificate too
- Authentication then happens during the handshake, before any application code runs
- Common inside a service mesh and for high-value partner integrations, at the cost of running a certificate authority
