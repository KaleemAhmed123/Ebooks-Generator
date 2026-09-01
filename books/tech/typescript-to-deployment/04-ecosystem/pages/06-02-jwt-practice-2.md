### The mistakes that matter

```ts
jwt.decode(token)   // reads the payload, verifies nothing
```

- `decode` is not `verify`. Anyone can craft a payload
- Never accept `alg` from the token header. `jose` refuses `none` for you
- Do not put anything private in a payload. It is base64, not encryption
- Do not put a permission list in the token. Roles change and the token will not

### `jsonwebtoken` 9.0.3

- Still fine for a symmetric secret you own on both sides
- `jose` for anything involving another party's keys, or asymmetric signing
