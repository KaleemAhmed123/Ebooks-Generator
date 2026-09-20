## Stateful connections

- Standard HTTP is stateless. Chat requires stateful connections. A user opens a WebSocket connection to a server and keeps it open
- We need a fleet of **Gateway Servers** whose only job is to hold millions of open WebSocket connections
- When a user connects to Gateway A, we must record that mapping in a shared Redis Connection Registry: `User123 -> Gateway A`
- The API services (which process logic) remain stateless. When a message is sent to User123, the API service checks Redis, sees Gateway A, and forwards the message to Gateway A to be pushed to the client

<svg viewBox="0 0 460 110" role="img" aria-label="WebSocket gateways holding stateful connections" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="30" width="40" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="30" y="49" text-anchor="middle" font-weight="bold">Alice</text>
  
  <rect x="90" y="30" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="125" y="49" text-anchor="middle" font-weight="bold" fill="#1d4e89">Gateway 1</text>
  
  <rect x="200" y="10" width="70" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="235" y="25" text-anchor="middle" font-weight="bold">Redis</text>
  <text x="235" y="35" text-anchor="middle" font-size="6">Alice -> GW1</text>
  
  <rect x="310" y="30" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="345" y="49" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Service</text>
  
  <rect x="410" y="30" width="40" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="430" y="49" text-anchor="middle" font-weight="bold">Bob</text>
  
  <path d="M50 45 L90 45" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M125 30 L200 25" stroke="#1d4e89" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
  <path d="M345 30 L270 25" stroke="#1d4e89" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
  <path d="M410 45 L380 45" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Using a standard HTTP Load Balancer that round-robins requests. When a WebSocket drops, the client reconnects. If the LB sends the reconnect to a different Gateway without updating Redis, messages will be routed to a dead connection

:::interview
Bob sends a message to Alice. Bob's HTTP request hits an API Server. How does the API Server get the message to Alice's phone?

The API Server queries the Redis Connection Registry for Alice's ID. Redis returns "Gateway 1". The API Server makes an RPC call to Gateway 1 with the message. Gateway 1 pushes it down Alice's open WebSocket.
:::
