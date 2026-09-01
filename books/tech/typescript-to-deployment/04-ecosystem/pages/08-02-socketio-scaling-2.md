### Emitting from somewhere else

```ts
import { Emitter } from "@socket.io/redis-emitter"

const emitter = new Emitter(redis)
emitter.to(`order:${orderId}`).emit("order:updated", payload)
```

- A queue worker or a cron job can push to sockets without holding any itself

### Shutting down

```ts
await io.close()
```

- Closes every connection and lets clients reconnect to a healthy instance
