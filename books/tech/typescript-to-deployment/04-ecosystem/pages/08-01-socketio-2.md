## Socket.IO - continued

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  const { payload } = await jwtVerify(token, key)
  socket.data.userId = payload.sub
  next()
})

io.on("connection", (socket) => {
  socket.join(`seller:${socket.data.sellerId}`)

  socket.on("order:watch", (orderId, ack) => {
    socket.join(`order:${orderId}`)
    ack({ ok: true })
  })

socket.on("disconnect", (reason) => logger.info({ reason }, "socket closed"))
})

io.to(`order:${orderId}`).emit("order:updated", { status: "shipped" })
```

- `io.use` is middleware for the handshake, and it is the only place to reject a connection before it exists
- **A room is just a string.** Joining `seller:s1` is how you address one seller without tracking socket ids yourself
- The `ack` callback gives you request and response semantics over a socket
