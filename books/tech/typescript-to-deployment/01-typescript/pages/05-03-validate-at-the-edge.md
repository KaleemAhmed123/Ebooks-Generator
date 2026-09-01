## Validating at the edge

- `safeParse` returns a result object instead of throwing
- `parsed.success` is the discriminator. Check it before touching the data

```ts
app.post("/users", (req, res) => {
  const parsed = User.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues)
  }

  const user = parsed.data          // now genuinely a User
  res.send(user.age.toFixed(2))     // safe
})
```

- `parsed.data` is typed as `User`, and this time it earned the type
- Compare it with the `as User` version back in Module 1
  - same code, same shape, completely different guarantee

<p class="verified">Verified against typescript 7.0.2, zod 4.5.4, node 24 LTS, on 2026-08-30</p>
