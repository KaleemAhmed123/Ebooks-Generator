## Rotation

- A secret that has never been rotated has an unknown blast radius. Rotation is a rehearsed procedure, not an emergency improvisation

| Secret | Rotate | Difficulty |
|---|---|---|
| Payment provider key | Yearly, or on any suspicion | Easy. Provider issues both, overlap, revoke old |
| Database password | Yearly | Medium. Every service reconnects |
| JWT signing key | Yearly | **Hard. Naive rotation logs out every user** |
| SSH deploy key | On staff change | Easy |
| TLS certificate | Automatic | None |

### Rotating a JWT key without logging everyone out

- Support two keys at once: sign with the new, accept either

```ts
const keys = {
  current: process.env.JWT_KEY_2026_08,
  previous: process.env.JWT_KEY_2025_11,
};

function verify(token: string) {
  try { return jwt.verify(token, keys.current); }
  catch { return jwt.verify(token, keys.previous!); }
}

const signed = jwt.sign(payload, keys.current, { keyid: "2026_08" });
```

1. Deploy with both keys, signing with the new one
2. Wait longer than the token lifetime
3. Remove the previous key

- Skipping step 2 invalidates every session in flight
