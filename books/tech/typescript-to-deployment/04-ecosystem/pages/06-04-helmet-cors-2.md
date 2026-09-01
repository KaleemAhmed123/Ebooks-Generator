### helmet 8.3.0

- Sets response headers that tell the browser to be stricter, and each one closes a specific attack

```js
app.use(helmet())
```

| Header | Stops |
|---|---|
| `Content-Security-Policy` | injected scripts from running |
| `X-Content-Type-Options: nosniff` | a JSON response being executed as JavaScript |
| `X-Frame-Options: DENY` | your page being framed for clickjacking |
| `Strict-Transport-Security` | a downgrade to plain HTTP |
| `Referrer-Policy` | URLs with tokens leaking to other sites |

```js
app.use(helmet({
  contentSecurityPolicy: {
    directives: { defaultSrc: ["'self'"], imgSrc: ["'self'", "https://cdn.example.com"] },
  },
}))
```

- For a JSON API most of these are cheap insurance. For anything serving HTML, CSP is the one that matters

### cors 2.8.5

```js
app.use(cors({
  origin: ["https://app.example.com", "https://seller.example.com"],
  credentials: true,
  maxAge: 86400,
}))
```

- `origin: "*"` and `credentials: true` cannot be combined, and the browser will refuse silently
- `maxAge` caches the preflight, removing an extra round trip before every cross-origin call
- CORS is a browser rule. It is not access control, and `curl` ignores it entirely
