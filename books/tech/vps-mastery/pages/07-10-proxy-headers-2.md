### The application must be told to trust them

- Headers can be forged by a client. A framework ignores them until configured to trust a proxy

```ts
app.set("trust proxy", 1);   // Express: trust exactly one proxy hop
```

- `1`, not `true`. Trusting an unlimited chain lets a client set any `X-Forwarded-For` it likes, which defeats rate limiting by IP
