### Keeping connections honest

```ts
const interval = setInterval(() => {
  for (const socket of wss.clients) {
    if (socket.isAlive === false) return socket.terminate()
    socket.isAlive = false
    socket.ping()
  }
}, 30_000)
```

- A dead TCP connection can stay open for a long time. Without ping and pong the server holds sockets nobody is using

### Choosing

- **Socket.IO** for a product feature, where reconnection and rooms are the work
- **ws** for a machine to machine feed where you control both ends

### WebRTC signalling

- WebRTC moves audio and video **directly between browsers**. Your server never carries the media
- What the server does carry is signalling: the offer, the answer, and the ICE candidates

```ts
socket.on("rtc:offer", ({ to, sdp }) => io.to(to).emit("rtc:offer", { from: socket.id, sdp }))
socket.on("rtc:answer", ({ to, sdp }) => io.to(to).emit("rtc:answer", { from: socket.id, sdp }))
socket.on("rtc:ice", ({ to, candidate }) => io.to(to).emit("rtc:ice", { from: socket.id, candidate }))
```

- **STUN** tells a peer its public address and is effectively free
- **TURN** relays the media when a direct path fails, which is roughly one call in five, and it is billed per gigabyte
- Booklet 6 covers the negotiation and the failure modes in full
