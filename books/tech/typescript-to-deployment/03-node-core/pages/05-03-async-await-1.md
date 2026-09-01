## `async` and `await`

- `async` makes a function return a promise
- `await` pauses that function until a promise settles, without blocking the thread

```js
async function loadOrder(id) {
  const order = await db.orders.findUnique({ where: { id } })
  if (!order) throw new Error("not_found")
  return order
}
```

- `throw` inside an `async` function rejects its promise
- `try / catch` works on `await` exactly as it does on synchronous code

### The mistake that costs real latency

```js
// sequential, 300ms
const order = await getOrder(id)      // 100ms
const seller = await getSeller(sid)   // 100ms
const items = await getItems(id)      // 100ms
```

```js
// parallel, 100ms
const [order, seller, items] = await Promise.all([
  getOrder(id),
  getSeller(sid),
  getItems(id),
])
```

- Only chain `await` when the next call needs the previous result
- Three independent awaits in a row is the most common performance bug in a Node codebase
