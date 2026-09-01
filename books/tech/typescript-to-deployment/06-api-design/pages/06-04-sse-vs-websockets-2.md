### The details that matter

- **`X-Accel-Buffering: no`** stops Nginx buffering the stream and delivering it all at the end
- **`id:` on each event** lets a reconnecting browser send `Last-Event-ID` and resume from where it stopped
- **`req.on("close")`** is mandatory. Without it the interval runs forever after the client leaves
- Send a comment line every 30 seconds as a heartbeat, or an idle proxy will close the connection

### Choosing

- **SSE** for progress, notifications, live dashboards and streamed LLM output. One direction is enough
- **WebSocket** for chat, collaborative editing and anything where the client sends continuously
