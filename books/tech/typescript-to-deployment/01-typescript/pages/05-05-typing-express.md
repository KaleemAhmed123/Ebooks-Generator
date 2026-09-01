## Typing Express with module augmentation

- Auth middleware puts a user on the request
- TypeScript does not know about it

```ts
app.use((req, res, next) => {
  req.user = decode(req.headers.authorization)
  // Property 'user' does not exist on type 'Request'
  next()
})
```

### The wrong fix

```ts
(req as any).user = decoded   // works, and poisons every downstream read
```

### The right fix - declaration merging

- Interfaces merge, so you can add to one that a library already declared

```ts
// src/types/express.d.ts
import "express"

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" }
    }
  }
}
```

- Make sure the file is inside your `include` in `tsconfig.json`

```ts
app.get("/me", (req, res) => {
  if (!req.user) return res.sendStatus(401)
  res.json({ id: req.user.id })    // fully typed
})
```

- `user` is optional on purpose - it is genuinely absent before auth runs
- That forces the 401 check, which is the point
