### Different limits for different costs

```js
app.use("/api", rateLimit({ windowMs: 60_000, limit: 100 }))

app.post("/auth/login", rateLimit({
  windowMs: 900_000,
  limit: 5,
  keyGenerator: (req) => req.body.email ?? req.ip,
}), login)

app.post("/reports", rateLimit({ windowMs: 3600_000, limit: 10 }), createReport)
```

- Login is limited by **email**, not IP, because an attacker rotates IPs and the target account does not change
- An expensive endpoint gets its own budget

### Behind a load balancer

```js
app.set("trust proxy", 1)
```

- Without it every request looks like it came from the proxy, so one client exhausts the limit for everyone
