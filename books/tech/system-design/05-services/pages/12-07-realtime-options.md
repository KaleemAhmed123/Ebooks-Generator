## Long-polling, SSE, WebSocket

- Four ways to get data to a client that did not ask for it. They differ on direction and on how much ordinary HTTP infrastructure still works, and the second usually decides

| | Direction | Connection | Costs |
|---|---|---|---|
| Short polling | client asks, repeatedly | none held | all the empty answers, and the client's radio |
| Long polling | client asks, server waits | one held per client, briefly | a reconnect after every message |
| SSE | server → client only | one held, indefinitely | one-way; text frames only |
| WebSocket | both ways | one held, indefinitely | its own protocol past the upgrade |

- Short polling is the right answer more often than its reputation suggests. If an update every thirty seconds is acceptable and there are ten thousand users, it is a few hundred requests a second against a cached endpoint — no held state, no reconnect logic, nothing new in the infrastructure
- SSE is the underrated middle. It is ordinary HTTP with a streaming body, so proxies, compression, authentication and load balancers all behave normally, and browsers reconnect automatically. It is enough for anything the server merely announces: notifications, progress, live figures
- WebSocket earns its complexity only when the client sends continuously too — collaborative editing, games, a terminal. If the client's messages are occasional, a normal `POST` beside an SSE stream does the same job with far less to operate

### The failure

- Streams and HTTP/1.1 together. A browser holds only a small number of simultaneous connections per origin, and an indefinitely open stream occupies one of them for as long as the tab lives — so a few tabs of the same application can consume the budget, and the next request in a new tab waits for a connection that will never free itself
- Over HTTP/2 the streams are multiplexed onto one connection and the problem disappears entirely. The failure is characteristic of held connections generally: nothing is slow, nothing errors, and requests simply never start
