# Module 8 - Realtime

## Socket.IO

- HTTP is one-way. The client asks, the server answers, the connection closes. The server cannot start a conversation
- For a chat message or a shipment status, that leaves polling: asking every few seconds whether anything changed, and almost always hearing no
- A **WebSocket** replaces that with one connection that stays open, over which either side can send at any time
- The browser and Node both speak it natively, so a raw WebSocket needs no library at all
- What it does not give you is everything around it. Reconnecting after a dropped connection, knowing who is connected, addressing a group, or confirming a message arrived
- **Socket.IO** is a protocol on top of WebSocket that supplies exactly those things
- It reconnects automatically, falls back to HTTP polling where WebSocket is blocked, and adds rooms and acknowledgements
- A **room** is a string a socket joins. Emitting to `seller:s1` reaches every socket in it, so you never track socket ids yourself
- The cost is that it is not plain WebSocket. The client must also be Socket.IO, so it is a poor fit for a public machine-to-machine feed
- Created by Guillermo Rauch in 2010, the same person who later founded Vercel
- Version 4.8.3

```bash
npm i socket.io
```

```ts
import { Server } from "socket.io"

const io = new Server(httpServer, { cors: { origin: env.APP_URL, credentials: true } })
