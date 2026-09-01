## Promises

- A promise is a value that is not ready yet. Three states: pending, fulfilled, rejected
- Once settled it never changes

```js
const order = await db.orders.findUnique({ where: { id: "o1" } })
```

### The four combinators

```js
// all must succeed, rejects on the first failure
const [order, seller] = await Promise.all([getOrder(id), getSeller(sid)])

// never rejects, reports each outcome
const results = await Promise.allSettled([getOrder(id), getSeller(sid)])
for (const r of results) {
  if (r.status === "fulfilled") use(r.value)
  else log(r.reason)
}

// first to settle either way
const fastest = await Promise.race([fetchPrimary(), timeout(2000)])

// first to succeed, rejects only if all fail
const mirror = await Promise.any([fetchA(), fetchB()])
```

| | Rejects when | Use it for |
|---|---|---|
| `all` | any rejects | work that must all succeed |
| `allSettled` | never | independent work, partial failure is fine |
| `race` | first settles, pass or fail | timeouts |
| `any` | all reject | mirrors and fallbacks |

- `Promise.all` rejecting does **not** cancel the others. They keep running
