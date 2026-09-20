## AbortSignal in TypeScript

- In a Node/browser environment, `AbortSignal` is the standard for cancellation and deadline propagation

```typescript
// 1. Create a signal that aborts after 5000ms
const signal = AbortSignal.timeout(5000);

try {
  // 2. Pass it to fetch
  const res = await fetch("https://api.example.com/data", { signal });
  
  // 3. Pass the SAME signal down to other async work
  await processData(await res.json(), { signal });
} catch (err) {
  if (err.name === 'TimeoutError') {
    // The 5000ms passed
  }
}
```

- When the timeout fires, `fetch` aborts the TCP socket immediately. If `processData` is running, it must check `signal.aborted` periodically or listen for the `abort` event

### AbortSignal.any

- If you need a timeout *and* a manual cancel button, combine them:

```typescript
const controller = new AbortController();
const timeout = AbortSignal.timeout(5000);
// Aborts if the user clicks cancel OR 5s pass
const combined = AbortSignal.any([controller.signal, timeout]);
```

### The failure

- `fetch(url, { signal: AbortSignal.timeout(5000) })` correctly drops the connection on the client side after 5 seconds. But if the backend does not listen for socket closures, it keeps processing the request. The client is safe, but the backend is still doing orphan work
