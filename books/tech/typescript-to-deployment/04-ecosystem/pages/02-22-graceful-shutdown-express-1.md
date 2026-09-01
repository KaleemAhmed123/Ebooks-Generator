## Shutting an Express server down

- A deploy sends `SIGTERM`, and everything in flight is your responsibility from that moment

```js
import { app } from "./app.js"

const server = app.listen(env.PORT, () => { ready = true })

server.keepAliveTimeout = 65_000
server.headersTimeout = 66_000

let shuttingDown = false

async function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true
  ready = false                       // readiness starts failing immediately

  logger.info({ signal }, "shutting down")

  const force = setTimeout(() => process.exit(1), 15_000)
  force.unref()

  server.close(async () => {
    await Promise.allSettled([db.$disconnect(), redis.quit(), worker.close()])
    clearTimeout(force)
    process.exit(0)
  })
}

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))
```

- Flipping `ready` first drains traffic before the socket closes, so nobody gets a connection reset
