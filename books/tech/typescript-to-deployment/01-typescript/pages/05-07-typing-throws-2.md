### Narrow it before you use it

```ts
try {
  await run()
} catch (err) {
  if (err instanceof NotFoundError) return res.sendStatus(404)
  if (err instanceof Error) return log(err.message, err.stack)
  return log(String(err))
}
```

### The helper worth writing once

```ts
function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err))
}
```

- Every error handler in your service can now assume a real `Error`
