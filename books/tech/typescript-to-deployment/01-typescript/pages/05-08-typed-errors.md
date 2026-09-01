## Typed errors

- `throw` is invisible to the type system
- So for **expected** failures, model them as values

### Option 1 - error classes plus `instanceof`

```ts
class AppError extends Error {
  constructor(public code: string, public status: number, message: string) {
    super(message)
  }
}

class NotFound extends AppError {
  constructor(what: string) { super("not_found", 404, `${what} not found`) }
}
```

```ts
if (err instanceof AppError) {
  return res.status(err.status).json({ code: err.code })
}
return res.sendStatus(500)
```

- One base class means one handler covers every expected failure
- Anything that is not an `AppError` is a bug, and deserves a 500

### Option 2 - a discriminated error union

```ts
type LoadError =
  | { code: "not_found" }
  | { code: "forbidden"; requiredRole: string }

type LoadResult = Result<User, LoadError>
```

- Now the failures are **in the signature**, and `switch` on `code` is exhaustive

### Which one

- Classes when the error travels far - through middleware, up to a global handler
- A `Result` union when the caller is right there and must handle it
