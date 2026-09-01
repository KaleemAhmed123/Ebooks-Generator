## Access and refresh tokens

- A JWT cannot be withdrawn once issued, so the only real control is how long it lives
- A short life fixes revocation and makes users log in constantly, which is why there are two tokens

| | Access token | Refresh token |
|---|---|---|
| Lifetime | 5 to 15 minutes | days or weeks |
| Sent | on every request | only to the refresh endpoint |
| Stored | memory, or a cookie | httpOnly cookie, and a row in your database |
| Revocable | not really | yes, it is a row you can delete |

### Rotation and reuse detection

```ts
const stored = await db.refreshToken.findUnique({ where: { id: presented.jti } })

if (!stored || stored.revoked) {
  await db.refreshToken.updateMany({ where: { userId }, data: { revoked: true } })
  throw new AppError("reuse_detected", 401, "session terminated")
}

await db.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } })
return issuePair(userId)
```

- Every refresh issues a new pair and revokes the old refresh token
- A revoked token appearing again means two parties hold it, so **every session for that user is dropped**
- That single check turns a stolen refresh token from permanent access into one extra request

### Where to store them in a browser

- `localStorage` is readable by any script on the page, so one XSS bug is a full account takeover
- An `httpOnly` cookie is not readable by script, at the cost of needing CSRF protection
- The common shape is refresh token in an `httpOnly` cookie, access token held in memory only
