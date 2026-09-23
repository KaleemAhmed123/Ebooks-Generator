## WebSockets and Server-Sent Events (SSE) - continued

```jsx
return <div>{messages.map(m => <p>{m.text}</p>)}</div>;
}
```
**Best Used For:** Real-time multiplayer games, live chat apps, collaborative document editing (Google Docs).

### 3. Server-Sent Events (SSE)
WebSockets are difficult to scale on the backend (maintaining thousands of open TCP connections requires specialized architecture like Redis Pub/Sub).

Often, you don't need two-way communication. You just need the server to push updates (like a live stock ticker, or a streaming ChatGPT response). The client never needs to push massive amounts of data back over the socket.

For this, we use **Server-Sent Events (SSE)**.
SSE is a persistent, one-way connection. It is significantly easier to implement because it operates over standard HTTP, meaning it easily passes through standard corporate firewalls and load balancers.

```javascript
// Listening to a Server-Sent Event stream
const eventSource = new EventSource('/api/stock-ticker');

eventSource.onmessage = (event) => {
  console.log("New stock price:", event.data);
};
```
**Best Used For:** ChatGPT streaming responses, live sports scores, stock market tickers.
