## Scaling Socket.IO

- A socket lives on exactly one process, so a second instance cannot reach it
- With two replicas, half your emits go nowhere and it looks like a flaky network

```bash
npm i @socket.io/redis-adapter
```

```ts
import { createAdapter } from "@socket.io/redis-adapter"

const pubClient = new Redis(env.REDIS_URL)
const subClient = pubClient.duplicate()

io.adapter(createAdapter(pubClient, subClient))
```

- Every emit is published to Redis, and each instance delivers to its own sockets
- Two connections are required, because a subscribing client cannot issue normal commands

### Sticky sessions

- Socket.IO starts on HTTP polling and upgrades to WebSocket
- Without sticky sessions the upgrade lands on a different instance and the handshake fails

```ts
const io = new Server(httpServer, { transports: ["websocket"] })
```

- Forcing WebSocket only removes the need for stickiness, at the cost of clients on networks that block it
