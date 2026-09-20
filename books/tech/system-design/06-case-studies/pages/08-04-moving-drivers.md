## Moving objects (Driver location)

- Drivers move, so their Geohash changes constantly. We use an in-memory store like Redis GEO (which uses Geohash under the hood) or a custom service
- **The Location Service:** A fleet of servers. Each server owns a set of H3 cells (via consistent hashing, →02). Drivers stream WebSockets to the API gateway, which routes the `(lat, lng)` to the correct Location server
- The server updates the driver's location in memory. No disk I/O.
- **Pub/Sub Variant (Nearby Friends):** If building "Nearby Friends", the cell acts as a Pub/Sub channel. Drivers publish their location to the channel `cell_9q8yy`. Riders subscribe to that channel

<svg viewBox="0 0 460 110" role="img" aria-label="Drivers update in-memory location service via WebSocket" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="49" text-anchor="middle" font-weight="bold">Driver</text>
  <text x="45" y="58" text-anchor="middle" font-size="6">every 4s</text>
  
  <rect x="110" y="30" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="145" y="49" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Gateway</text>
  
  <rect x="220" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="260" y="25" text-anchor="middle" font-weight="bold">Location Service</text>
  <text x="260" y="35" text-anchor="middle" font-size="6">(In-Memory Grid)</text>
  
  <rect x="220" y="60" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="260" y="75" text-anchor="middle" font-weight="bold">Matcher</text>
  
  <path d="M70 45 L110 45" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 40 L220 25" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M260 40 L260 60" stroke="#1a1a1a" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
  <text x="285" y="53" text-anchor="middle" font-size="6">Queries radius</text>
</svg>

### The failure

- Using HTTP POST for 4-second location updates. The TLS handshake overhead will consume more CPU than the actual update. You must use persistent WebSockets or gRPC streams

:::interview
Your driver app sends HTTP POST /location every 4 seconds. Your load balancers hit 100% CPU on TLS handshakes. How do you optimize the transport layer?

Switch to WebSockets or gRPC streams to maintain a persistent connection, eliminating the TLS and TCP handshake overhead on every update.
:::
