## Timeouts in TypeScript, both ends

- On the client, `AbortSignal` is the standard way to carry a deadline. One signal, passed to every async call in the chain

```typescript
const signal = AbortSignal.timeout(5_000)          // fires after 5 s
try {
  const res = await fetch("https://api.example.com/data", { signal })
  await processData(await res.json(), { signal })  // same signal, passed down
} catch (err) {
  if ((err as Error).name === "TimeoutError") { /* the 5 s passed */ }
}

// a deadline AND a cancel button: whichever fires first
const controller = new AbortController()
const combined = AbortSignal.any([controller.signal, AbortSignal.timeout(5_000)])
```

- When the signal fires, `fetch` drops the socket at once. Anything downstream must check `signal.aborted` or listen for `abort`, or it carries on as orphan work

### On the server, the same idea in reverse

- A server timeout protects the server from its clients. Node's `http.Server` has one per phase: `headersTimeout` against a client that sends one header byte a minute to hold a socket (slowloris), `requestTimeout` against a request that never finishes, `keepAliveTimeout` for idle sockets, `server.timeout` for inactivity in any phase. The defaults are in the table on page 8 of Module 6
- `keepAliveTimeout` is also the balancer race on page 5 of Module 6. Set it above the balancer's idle timeout

### The failure

- `headersTimeout` and `requestTimeout` both set to 0 because one upload sometimes failed. A week later, 10,000 connections each send a byte a minute and the server runs out of file descriptors. The upload was fixed; the server was gone
