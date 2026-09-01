## One validation middleware for the whole app

```ts
import type { RequestHandler } from "express"
import type { ZodType } from "zod"

export function validate(schemas: {
  body?: ZodType
  query?: ZodType
  params?: ZodType
}): RequestHandler {
  return (req, res, next) => {
    for (const key of ["body", "query", "params"] as const) {
      const schema = schemas[key]
      if (!schema) continue

      const parsed = schema.safeParse(req[key])
      if (!parsed.success) {
        return res.status(400).json({
          code: "validation_failed",
          in: key,
          issues: parsed.error.issues,
        })
      }
      if (key !== "query") req[key] = parsed.data
    }
    next()
  }
}
```

```ts
router.post("/orders", validate({ body: CreateOrder }), createOrder)
```

- Written once, used on every route
- The handler can now trust `req.body` completely

:::note
On Express 5 `req.query` is a getter and cannot be assigned. Read the parsed value from a local variable, or attach it as `req.validatedQuery` instead of overwriting.
:::
