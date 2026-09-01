## Errors worth throwing

- `throw new Error("failed")` tells a caller nothing it can act on

```js
class AppError extends Error {
  constructor(code, status, message, options) {
    super(message, options)
    this.name = this.constructor.name
    this.code = code
    this.status = status
  }
}

class NotFound extends AppError {
  constructor(what) {
    super("not_found", 404, `${what} not found`)
  }
}
```

```js
if (err instanceof AppError) {
  return res.status(err.status).json({ code: err.code })
}
return res.status(500).json({ code: "internal" })
```

- One base class means one handler covers every expected failure
- Anything that is not an `AppError` is a bug, and deserves a 500

### Keeping the original error

```js
try {
  await razorpay.capture(paymentId)
} catch (err) {
  throw new AppError("payment_failed", 502, "capture failed", { cause: err })
}
```

- `cause` is standard. The original stack is preserved and printed underneath yours
- Without it you get your message and no idea what actually broke
