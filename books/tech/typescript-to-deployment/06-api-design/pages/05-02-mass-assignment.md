## Mass assignment and SSRF

### Mass assignment

```ts
// the caller decides which columns to write
await db.user.update({ where: { id: req.user.id }, data: req.body })
```

- A body of `{"name":"kaleem","role":"admin"}` promotes the caller
- The endpoint is authenticated, authorized and correct for every honest request

```ts
const Input = z.object({ name: z.string(), avatarUrl: z.url().optional() })
const data = Input.parse(req.body)      // unknown keys are dropped
await db.user.update({ where: { id: req.user.id }, data })
```

- **Never pass a request body straight into a write.** Parse it into a shape you defined
- The same applies on the way out. Returning a whole row leaks `passwordHash` and internal flags

### Server side request forgery

```ts
// the caller chooses what your server fetches
const res = await fetch(req.body.imageUrl)
```

- Your server sits inside the network. A URL of `http://169.254.169.254/latest/meta-data/` returns cloud credentials
- Internal admin panels with no authentication are reachable too, because the request comes from inside

### Closing it

- Allowlist the schemes, so only `http` and `https`
- Resolve the hostname and **reject private ranges**, including loopback, link-local and the metadata address
- Re-check after redirects, since the first hop can be public and the second private
- Best of all, do not fetch caller-supplied URLs. Take an upload instead
