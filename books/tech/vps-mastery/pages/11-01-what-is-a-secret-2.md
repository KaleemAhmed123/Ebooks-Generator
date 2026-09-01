### Redaction in logs

```ts
const REDACT = new Set(["password", "token", "authorization", "secret", "apiKey"]);

function safe(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) =>
      REDACT.has(k.toLowerCase()) ? [k, "[redacted]"] : [k, v],
    ),
  );
}
```

- Log an entire request body once in production and the secret is now in Loki, in a backup, and in a screenshot in a chat thread
