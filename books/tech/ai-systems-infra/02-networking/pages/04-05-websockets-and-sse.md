## WebSockets and SSE

- HTTP is request/response: the client asks, the server answers. Two protocols break that when you need the **server to keep sending**:
  - **WebSocket** upgrades an HTTP connection into a **raw, bidirectional** channel. After an HTTP `Upgrade` handshake, both ends send messages any time, in both directions, over the one long-lived TCP connection. Use it for genuine two-way, low-latency traffic — chat, collaborative editing, live trading, multiplayer.
  - **Server-Sent Events (SSE)** is one-way: the server streams a sequence of events to the client over an ordinary HTTP response that never closes. It's far simpler than WebSocket, rides normal HTTP (so proxies and auth "just work"), and **auto-reconnects**. Use it when only the server needs to push — dashboards, progress, notifications.

- The decision is about **direction**: do you need the client to push continuously too (WebSocket), or just to receive a stream (SSE)? Most "live" features are server→client only, so SSE is often the lighter, more robust choice teams overlook because WebSocket is more famous.

:::note
This is how **LLM token streaming** reaches a browser (Booklet 10). A model generates tokens one at a time; the server streams them as they're produced rather than making the user wait for the whole answer. SSE is the common transport for it — a single long HTTP response emitting `data:` events — which is why the serving layer must handle long-lived connections and **backpressure** (Booklet 2's socket buffers, Booklet 3's flow control) rather than buffering a whole response.
:::

### Module 4 — checkpoint
- **Key concepts:** HTTP/1.1 keep-alive & the serial-per-connection limit · HTTP/2 multiplexing + HPACK (but TCP HOL remains) · HTTP/3 = QUIC/UDP (independent streams, 1-RTT, migration) + TCP fallback · gRPC = HTTP/2 + protobuf (control planes) · WebSocket (two-way) vs SSE (server-push, token streaming).
- **Task:** `curl -I --http2 https://example.com` and `curl -I --http3 https://example.com` (if supported) and compare; inspect a site's protocol in your browser's network panel.
- **Questions:** Why did browsers open 6 connections for HTTP/1.1? What does HTTP/3 fix that HTTP/2 couldn't? When is SSE the better choice than WebSocket?
- **Next:** Module 5 — getting traffic to the right place.
