## Routing real-time messages

- If User A and User B are both connected to your WebSocket server (Server 1), and User A sends a chat message to User B, Server 1 can simply find User B's socket in memory and send the message
- But what if User A is connected to Server 1 (in New York) and User B is connected to Server 2 (in Tokyo)? Server 1 does not have User B's socket. How does the message cross the ocean?
- The standard solution is a Pub/Sub Backplane (usually Redis). When User B connects to Server 2, Server 2 subscribes to a Redis channel called `user:B`

<svg viewBox="0 0 460 140" role="img" aria-label="Pub/Sub Routing. Server 1 publishes to Redis, Redis routes to Server 2, Server 2 pushes to User B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="73" text-anchor="middle">Server 1</text>
  
  <rect x="360" y="55" width="80" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="73" text-anchor="middle">Server 2</text>
  
  <rect x="190" y="55" width="80" height="30" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="73" text-anchor="middle">Redis Pub/Sub</text>
  
  <path d="M105 70 L185 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M180 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="145" y="65" text-anchor="middle" font-size="7">Publish to user:B</text>
  
  <path d="M275 70 L355 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M350 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="315" y="65" text-anchor="middle" font-size="7">Push to Subscribers</text>
  
  <path d="M400 50 L400 30" stroke="#b8541a" fill="none" stroke-width="2"/>
  <path d="M397 35 l3 -5 l3 5 z" fill="#b8541a"/>
  <text x="400" y="20" text-anchor="middle" fill="#b8541a" font-size="7">Deliver to User B</text>
</svg>

- When User A sends the message to Server 1, Server 1 simply publishes the message to the `user:B` channel in Redis. Redis instantly pushes the message to Server 2, and Server 2 delivers it

### The failure

- The failure is the O(N²) broadcast storm. If you do not use specific user channels (like `user:B`), and instead just publish every single chat message to a massive global `all-messages` channel, Redis will have to broadcast every single message to all 50 of your servers
- 49 of those servers will receive the message, realize User B is not connected to them, and throw the message away. This wastes massive amounts of internal bandwidth. You must route messages precisely to the server that actually holds the active socket
