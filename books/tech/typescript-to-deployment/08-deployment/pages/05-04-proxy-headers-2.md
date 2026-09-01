### Telling Express to believe them

```ts
app.set("trust proxy", 1)      // trust exactly one proxy in front
req.ip                          // now the real client address
req.protocol                    // now "https"
```

- **`trust proxy` must be a number or a specific address, not `true`.** Trusting everything lets any client forge `X-Forwarded-For` and defeat your rate limiter
- Behind an ALB **and** Nginx, the count is 2. Getting it wrong is the reason a rate limiter blocks everyone or nobody
