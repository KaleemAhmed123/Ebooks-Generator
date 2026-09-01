## ws and WebRTC signalling

- Socket.IO is a protocol layered on top of WebSocket. Sometimes you want the WebSocket without the protocol
- A feed between two services you control needs no reconnection logic, no rooms and no fallback, and every byte of extra framing is overhead
- `ws` is that: the raw protocol, nothing added, and it is what Socket.IO uses underneath
- A different problem is audio and video, where routing media through your server would cost more in bandwidth than the feature earns
- **WebRTC** lets two browsers send media directly to each other, so your server never carries it
- What your server does carry is **signalling**: each side describing what it can encode and how it might be reachable
- They cannot exchange that themselves, because they have no connection yet, which is the entire reason a signalling server exists

### ws 8.x

```ts
import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ server })

wss.on("connection", (socket) => {
  socket.on("message", (data) => socket.send(data))
})
```

- The raw protocol, nothing added. Smaller and faster than Socket.IO
- You write reconnection, heartbeats, rooms and message framing yourself
