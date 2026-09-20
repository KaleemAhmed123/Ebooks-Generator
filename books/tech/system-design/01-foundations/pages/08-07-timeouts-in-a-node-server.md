## Timeouts in a Node server

- A client timeout protects the client. A server timeout protects the server. Node's `http.Server` has knobs for every phase of a request

| Property | Default | What it stops |
|---|---|---|
| `headersTimeout` | 60 seconds | slowloris attacks (sending one byte a minute to tie up sockets) |
| `requestTimeout` | 300 seconds | an upload that is too slow, or a request that hangs |
| `keepAliveTimeout` | 5 seconds (Node 24)* | the idle race (Module 6, page 6) |
| `server.timeout` | 0 (none) | absolute socket lifespan |

- *Node's `main` branch changed `keepAliveTimeout` to 65 seconds to fix the LB race, but as of late 2026, many production deployments still run the 5-second default

### The overlap

- If `headersTimeout` fires, Node returns a `408 Request Timeout` and closes the connection
- Setting these too high exposes the server to resource exhaustion. Setting them too low breaks slow clients on bad networks

### The failure

- An engineer disables `headersTimeout` because a file upload sometimes fails. A week later, a slowloris attack opens 10,000 connections, sends one header byte every 50 seconds, and exhausts the server's file descriptors. The upload fixed; the server dead
