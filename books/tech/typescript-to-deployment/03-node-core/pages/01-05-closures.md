## Closures

- A **closure** is a function that keeps access to the variables where it was defined, even after that scope has finished

```js
function counter() {
  let count = 0

  return function () {
    count = count + 1
    return count
  }
}

const next = counter()
next()   // 1
next()   // 2
next()   // 3
```

- `counter()` has already returned, so `count` should be gone
- The returned function still holds it, so it survives

### Why it matters on a server

- It is how a module keeps private state without exposing it

```js
function rateLimiter(max) {
  const hits = new Map()

  return function allow(sellerId) {
    const n = (hits.get(sellerId) ?? 0) + 1
    hits.set(sellerId, n)
    return n <= max
  }
}

const allow = rateLimiter(100)
allow("s1")   // true
```

- Nothing outside `rateLimiter` can read or corrupt `hits`
