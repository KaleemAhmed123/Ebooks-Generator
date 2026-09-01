## AbortController and timeouts

- A request with no timeout waits forever, and holds a connection while it does

```js
const controller = new AbortController()
const timer = setTimeout(() => controller.abort(), 5000)

try {
  const res = await fetch(url, { signal: controller.signal })
  return await res.json()
} finally {
  clearTimeout(timer)
}
```

- `controller.abort()` makes the pending operation reject with an `AbortError`
- `clearTimeout` in `finally` so a fast response does not leave a timer behind

### The shorter version

```js
const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
```

- `AbortSignal.timeout` is built in. No controller, no cleanup

### Combining signals

```js
const signal = AbortSignal.any([
  AbortSignal.timeout(5000),
  request.signal,          // the client hung up
])
```

- Whichever fires first wins
- Aborting when the client disconnects stops you doing work nobody is waiting for

### Where signals are accepted

- `fetch`, `fs/promises`, `stream/promises`, `events.once`, `setTimeout` from `node:timers/promises`
- Most modern libraries take one too. Look for it before writing your own race
