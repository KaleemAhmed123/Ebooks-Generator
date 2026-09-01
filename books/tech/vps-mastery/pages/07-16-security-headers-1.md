## Security headers

```nginx
server_tokens off;

add_header X-Content-Type-Options   "nosniff" always;
add_header X-Frame-Options          "SAMEORIGIN" always;
add_header Referrer-Policy          "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

| Header | Stops |
|---|---|
| `server_tokens off` | Version disclosure in responses and error pages |
| `X-Content-Type-Options` | The browser guessing a type and running an upload as script |
| `X-Frame-Options` | The site being framed for clickjacking |
| `Referrer-Policy` | Full URLs, including tokens in query strings, leaking to third parties |
| `Strict-Transport-Security` | Any future plain HTTP request to this host |

- `always` makes the header apply to error responses too. Without it, a 502 page carries none of them

### HSTS is not reversible quickly

- A browser that has seen `max-age=31536000` refuses plain HTTP to that host for a year, even if the certificate later expires
- **Start at `max-age=300`** while confirming TLS works everywhere, then raise it. Do not add `preload` until certain, because removal from the preload list takes months
