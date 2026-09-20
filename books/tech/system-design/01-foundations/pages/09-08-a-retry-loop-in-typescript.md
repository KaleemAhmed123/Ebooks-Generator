## A retry loop in TypeScript

- Classification, deadline, backoff, jitter, and the server's hint, in one function. `fetch` does not throw on a 5xx; it resolves. The status is the signal

```typescript
const delay = (ms: number, signal: AbortSignal) =>
  new Promise<void>((ok, fail) => {
    const t = setTimeout(ok, ms)
    signal.addEventListener("abort", () => { clearTimeout(t); fail(signal.reason) }, { once: true })
  })

async function fetchWithRetry(url: string, signal: AbortSignal,
  { maxAttempts = 3, base = 50, cap = 20_000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    signal.throwIfAborted()                                   // parent gave up: stop now
    const res = await fetch(url, { signal })
    const transient = res.status === 429 || res.status >= 500
    if (!transient || attempt === maxAttempts - 1) return res // ok, terminal, or out of attempts
    const backoff = Math.random() * Math.min(cap, base * 2 ** attempt)   // full jitter
    const hint = Number(res.headers.get("retry-after")) * 1000 || 0       // server knows better
    await res.body?.cancel()                                  // free the socket before sleeping
    await delay(Math.min(cap, Math.max(backoff, hint)), signal)
  }
}
```

- `throwIfAborted` at the top of every attempt is deadline propagation: a signal that fired during the sleep never sends another request
- Any 4xx except 429 returns on the first attempt. A `400` retried three times is three guaranteed failures
- `Math.max(backoff, hint)` respects `Retry-After`; the outer `Math.min(cap, …)` stops a broken server parking you for a day. Add jitter to the hint too if thousands of clients share it


### The failure

- Checking `try / catch` for a 500. `fetch` only throws on network failure or abort. The 500 goes straight through as a "success" and the retry code never runs
