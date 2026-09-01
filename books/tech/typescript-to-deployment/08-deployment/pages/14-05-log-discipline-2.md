### Redaction

```ts
// pino
redact: {
  paths: ["req.headers.authorization", "req.headers.cookie", "*.password",
          "*.token", "*.secret", "*.card", "body.otp"],
  censor: "[redacted]",
}
```

```ts
// winston
const redact = winston.format((info) => {
  if (info.password) info.password = "[redacted]"
  if (info.headers?.authorization) info.headers.authorization = "[redacted]"
  return info
})
```

- **Redact by key name, at the logger, once.** Relying on every call site to remember is how a token reaches a log aggregator
- **Never log a whole request or a whole user object.** Pick the fields. It is smaller, cheaper and safer

### Sampling the noise

- **A health check every ten seconds from a load balancer is 8,640 log lines a day saying nothing.** Turn its logging off, as Module 5's Nginx page does
