## Globals that removed a dependency

### `fetch`, so no `axios` or `node-fetch`

```js
const res = await fetch("https://api.internal/orders", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ id: "o1" }),
  signal: AbortSignal.timeout(5000),
})

if (!res.ok) throw new Error(`http ${res.status}`)
const data = await res.json()
```

- `fetch` does **not** reject on a 404 or a 500. Only on a network failure. Check `res.ok` yourself
- It is `undici` underneath. Import `undici` directly when you need connection pooling control or an agent

### `structuredClone`, so no `lodash.clonedeep`

```js
const copy = structuredClone(order)   // deep, handles Map, Set, Date
```

### `AbortSignal.timeout`, so no timeout race

```js
await fetch(url, { signal: AbortSignal.timeout(5000) })
```
