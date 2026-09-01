## Error handling end to end - continued

if (status >= 500) req.log.error({ err, requestId: req.id }, "unhandled")
  else req.log.warn({ code, requestId: req.id }, "request rejected")

  res.status(status).json({
    code,
    message: status >= 500 ? "internal error" : err.message,
    requestId: req.id,
  })
})
```

- A 500 message is deliberately vague, because stack traces and SQL text leak internals
- The `requestId` in the body is what turns a user complaint into a log search
