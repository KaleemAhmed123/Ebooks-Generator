## WebSockets and Server-Sent Events (SSE)

HTTP is a uni-directional protocol. The client (React) must explicitly ask the server for data (`fetch`). The server answers, and the connection closes immediately. 
The server has absolutely no way to reach out and "push" new data to the browser on its own.

So, how does a Live Chat application work? If your friend sends you a message, how does it instantly appear on your screen without you refreshing the page?

### 1. The Old Hack: Short Polling
Before modern APIs existed, developers used `setInterval` to repeatedly `fetch('/api/messages')` every 2 seconds. 
This was a disaster. It overwhelmed the server with thousands of empty requests, draining battery life and wasting bandwidth.

### 2. WebSockets (Full Duplex)
WebSockets solve this by creating a persistent, two-way (full-duplex) connection between the browser and the server.
Once the connection is established, the server can push data to the client at any time, and the client can push data to the server at any time, with virtually zero latency or HTTP overhead.

```jsx
import { useEffect, useState } from 'react';

export function ChatRoom() {
  const [messages, setMessages] = useState([]);
```

```jsx
useEffect(() => {
    // 1. Open the connection
    const socket = new WebSocket('wss://api.mychat.com');

    // 2. Listen for incoming messages pushed by the server
    socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMsg]);
    };

    // 3. ALWAYS clean up the socket when the component unmounts
    return () => socket.close();
  }, []);
```
