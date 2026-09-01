## Below HTTP

- `http` is not a primitive. It is a protocol spoken over a TCP socket, and `node:net` is where those sockets live
- Most backend work never touches it directly, and knowing it is there explains where connection limits, keep-alive and timeouts actually come from
- It is also the layer you drop to for a protocol that is not HTTP: a database driver, a metrics agent, a legacy integration speaking its own format over a socket

```js
import { createServer } from "node:net"

const server = createServer((socket) => {
  socket.setKeepAlive(true, 30_000)
  socket.setTimeout(60_000, () => socket.destroy())

  socket.on("data", (chunk) => socket.write(chunk))
  socket.on("error", (err) => logger.warn({ err }, "socket error"))
})

server.listen(9000)
```

- A socket is a duplex stream, so everything from the streams module applies, backpressure included

### The detail that matters at this level

- **TCP has no message boundaries.** It is a byte stream, so one `write` can arrive as three `data` events, and three writes can arrive as one
- Any protocol on top must define its own framing, usually a length prefix or a delimiter
- Assuming one `data` event is one message is the classic bug, and it only appears under load or on a slow network

### `node:dgram`

- UDP, which is fire and forget. No connection, no ordering, no delivery guarantee
- Right for metrics to StatsD and for DNS. Wrong for anything that must arrive
