## `uncaughtException` and `unhandledRejection`

- The two last-resort handlers, and both mean something already went wrong

```js
process.on("uncaughtException", (err) => {
  logger.fatal(err)
  process.exit(1)
})

process.on("unhandledRejection", (reason) => {
  logger.fatal(reason)
  process.exit(1)
})
```

### Why they exit

- An uncaught exception means the stack unwound past every `try`
- The process is in an unknown state. A half-written file, a lock never released, a transaction never committed
- Continuing on is how corrupt data gets written

### The rule

- Log the error with everything you know, then exit non-zero
- Let the supervisor restart you. Docker, Kubernetes, systemd and pm2 all will
- A clean restart is far cheaper than a process quietly serving wrong answers

:::note
An unhandled rejection has terminated the process by default since Node 15. Adding a handler that only logs and keeps going puts you back to the old behavior, which is worse than doing nothing.
:::

- Treat both as monitoring, not as error handling. Real handling belongs at the `await`
