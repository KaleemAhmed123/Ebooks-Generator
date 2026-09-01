## Using tokens without getting burned

### Two tokens, not one

| | Access token | Refresh token |
|---|---|---|
| Lifetime | 5 to 15 minutes | days or weeks |
| Sent | with every request | only to the refresh endpoint |
| Stored | memory or a cookie | httpOnly cookie |
| Revocable | not really | yes, it is a database row |

- A JWT cannot be un-issued, so the short lifetime is the entire revocation strategy
- The refresh token is stored server side, which is what actually allows a logout

### Rotation

```ts
const stored = await db.refreshTokens.findUnique({ where: { id: presented.jti } })

if (!stored || stored.revoked) {
  await db.refreshTokens.updateMany({ where: { userId }, data: { revoked: true } })
  throw new AppError("reuse_detected", 401, "session terminated")
}
```

- Each refresh issues a new token and revokes the old one
- A revoked token appearing again means it was stolen, so every session for that user is dropped
