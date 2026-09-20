## Server-Sent Events

- Server-Sent Events (SSE) is a formalization of long polling. The client makes a single HTTP request, and the server replies with `Content-Type: text/event-stream`. The server keeps the connection open forever, continually streaming new lines of text down to the client
- It is strictly one-way (Server to Client). It is perfect for stock tickers, live sports scores, or news feeds where the user only needs to receive data

````javascript
// The browser has a built-in API for SSE
const eventSource = new EventSource('/api/live-scores');

eventSource.onmessage = function(event) {
  console.log("New score:", event.data);
};
````

### The failure

- The failure is using SSE over HTTP/1.1. The HTTP/1.1 specification strictly limits a browser to 6 open connections per domain
- If a user opens 6 tabs of your application, and each tab opens an SSE connection, they have exhausted the browser's connection pool. If they open a 7th tab, the browser will refuse to load the CSS, JS, or API requests for that tab, because it is waiting for one of the 6 connections to close (which they never will)
- If you use SSE, you must use HTTP/2. HTTP/2 allows multiplexing hundreds of streams over a single TCP connection, completely bypassing the 6-connection limit
