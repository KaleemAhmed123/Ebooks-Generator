## The password login flow

- The most-implemented flow in backend work, and the one with the most quiet mistakes

```ts
const user = await db.user.findUnique({ where: { email } })
const ok = user && (await argon2.verify(user.passwordHash, password))

if (!ok) {
  await recordFailure(email, req.ip)
  return res.status(401).json({ code: "invalid_credentials" })
}

const session = await createSession(user.id, req)
res.cookie("session", session.id, {
  httpOnly: true, secure: true, sameSite: "lax", maxAge: 86400000,
})
```

### The details that matter

- **One error message for both cases.** Saying no such user tells an attacker which emails are registered
- **Verify the hash even when the user does not exist.** Otherwise the response time reveals it anyway. Compare against a dummy hash
- **Rate limit by email, not only by IP.** An attacker rotates IPs. The target account does not change
- **Rotate the session id on login.** Reusing a pre-login id allows session fixation
- **`httpOnly`** keeps the cookie away from JavaScript, so an XSS bug cannot read it
- **`sameSite: lax`** stops the cookie being attached to cross-site POSTs, which is most of CSRF

### Logout, and what it must actually do

- Delete the session row. Clearing the cookie alone leaves a token that still works if it was copied
