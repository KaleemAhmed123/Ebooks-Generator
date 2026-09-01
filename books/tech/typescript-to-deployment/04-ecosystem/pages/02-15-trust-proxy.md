## Trust proxy

- Behind Nginx, an ALB or Cloudflare, the socket address is the proxy, not the user
- `trust proxy` tells Express to read `X-Forwarded-For` instead, and it changes three things at once

```js
app.set("trust proxy", 1)   // trust exactly one hop
```

| Affected | Before | After |
|---|---|---|
| `req.ip` | the proxy's address | the client's address |
| `req.protocol` | `http` | `https` |
| `req.secure` | `false` | `true` |

- `secure: true` cookies are silently dropped while `req.secure` is false, which is why sessions "work locally but not in production"

### Set the number of hops, not `true`

```js
app.set("trust proxy", true)   // trusts the whole header
```

- `X-Forwarded-For` is client controlled. Trusting all of it lets anyone spoof `req.ip` and defeat the rate limiter
- The number is how many proxies are actually in front of you. One ALB is `1`. ALB plus Cloudflare is `2`

### Checking it

```js
app.get("/debug/ip", (req, res) => res.json({ ip: req.ip, xff: req.get("x-forwarded-for") }))
```

- Hit it through the real load balancer. `req.ip` should be your machine, not a private range
