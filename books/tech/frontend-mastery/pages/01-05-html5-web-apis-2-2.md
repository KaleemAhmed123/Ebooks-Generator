### 4. WebSockets & Server-Sent Events (SSE)

For real-time data, HTTP polling is inefficient.

- **WebSockets**: Provide full-duplex, bidirectional communication over a single TCP connection. Best for low-latency, highly interactive features (multiplayer games, chat apps).
- **Server-Sent Events (SSE)**: A unidirectional stream from the server to the client over standard HTTP. Much easier to set up than WebSockets, supports automatic reconnection out of the box, and works flawlessly over HTTP/2. Best for dashboards, live feeds, and notification streams.

### 5. Web Workers

JavaScript is single-threaded. If you run a massive computation (e.g., parsing a 50MB CSV file, generating complex cryptography), the main thread freezes. The UI locks up, and the user cannot click or scroll.

**Web Workers** allow you to spin up background threads. You can offload heavy processing to a worker, and it will run in parallel without blocking the main UI thread. They communicate via a postMessage interface.

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ command: 'process_data', data: massiveArray });

worker.onmessage = (e) => {
  console.log('Processed data received:', e.data);
};
```
