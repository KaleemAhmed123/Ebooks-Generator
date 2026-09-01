# Module 7 - Clients, files and integrations

## Calling other services

- Almost every backend calls another one. A payment provider, a shipping API, a search service, a model provider
- Node's `http` module can make that call, but it deals in streams and events, and it has no idea what JSON is
- An **HTTP client** wraps that into one function call, handles the body, and gives you a promise
- For years that meant installing `axios` or `node-fetch`, because Node shipped nothing usable
- Node now has `fetch` as a global, so for most calls there is nothing to install at all
- Two of its defaults surprise people, and both cause outages: it does not reject on a 404 or a 500, and it has no timeout
- A call with no timeout holds a connection open until the other side gives up, which under load takes your service down with theirs
- Underneath, `fetch` is `undici`, which you can import directly when you need connection pooling or a proxy

### Native `fetch`, the default now

```ts
const res = await fetch(url, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(5000),
})

if (!res.ok) throw new AppError("upstream_failed", 502, `http ${res.status}`)
const data = await res.json()
```

- **`fetch` does not reject on a 404 or a 500.** Only on a network failure, so `res.ok` is not optional
- No timeout by default either, which is why `AbortSignal.timeout` belongs on every call
