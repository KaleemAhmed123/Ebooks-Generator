## Auth libraries in one page each

- Letting someone sign in with Google means implementing **OAuth 2.0**, a protocol where another service vouches for who a person is
- The flow has steps that all have to be right: a redirect, a state parameter to stop forgery, a code exchange, then verifying the token that comes back
- Verification is the step people skip, and skipping it is a complete authentication bypass, because an unverified token is a string anyone can write
- **Two-factor** adds a second proof that the person holds a device, usually a six digit code derived from a shared secret and the current time
- Both are areas where a library exists to stop you implementing a specification incorrectly, not to save you typing

### passport 0.7.0

```js
passport.use(new GoogleStrategy({ clientID, clientSecret, callbackURL }, verify))
app.get("/auth/google", passport.authenticate("google", { scope: ["email"] }))
```

- Hundreds of strategies, one interface. Reach for it when you need many providers
- The API predates promises, so it feels dated. For a single provider, calling the OAuth endpoints directly is often less code

### google-auth-library 10.x

```js
const ticket = await client.verifyIdToken({ idToken, audience: CLIENT_ID })
const { email, sub } = ticket.getPayload()
```

- Verifies a Google ID token properly, including signature, issuer, audience and expiry
- Decoding it yourself and trusting the email is a complete authentication bypass
