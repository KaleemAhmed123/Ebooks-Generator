## Signals

- The operating system tells a process to do something by sending a signal

| Signal | Sent by | Can you catch it |
|---|---|---|
| `SIGINT` | ctrl-c | yes |
| `SIGTERM` | `docker stop`, Kubernetes, `kill` | yes |
| `SIGKILL` | `kill -9` | **no** |
| `SIGHUP` | terminal closed | yes |

```js
process.on("SIGTERM", () => {
  console.log("shutting down")
  server.close(() => process.exit(0))
})
```

- `SIGTERM` is the one that matters in production. Every container orchestrator sends it first
- `SIGKILL` cannot be caught. It is what arrives after the grace period runs out

### The default that surprises people

- With no handler, `SIGTERM` kills the process immediately
- In flight requests are dropped and open transactions are abandoned
- Module 6 covers doing this properly
