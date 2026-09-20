## WebSockets

- If you are building a multiplayer game or a collaborative document editor (like Google Docs), one-way communication is not enough. You need full-duplex, two-way communication
- WebSockets solve this. The client sends a standard HTTP request asking to "Upgrade" to a WebSocket. If the server agrees, they switch to a raw TCP socket. Both the client and the server can send binary or text frames to each other at any time, instantly

<svg viewBox="0 0 460 140" role="img" aria-label="WebSockets. HTTP Upgrade, then full duplex two-way frames." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M80 30 L80 130" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M380 30 L380 130" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  
  <text x="80" y="20" text-anchor="middle" font-weight="bold">Client</text>
  <text x="380" y="20" text-anchor="middle" font-weight="bold">Server</text>
  
  <path d="M80 40 L380 50" stroke="#1d4e89" fill="none"/>
  <path d="M375 47 l5 3 l-2 -5 z" fill="#1d4e89"/>
  <text x="230" y="38" text-anchor="middle" font-size="7">HTTP Upgrade: websocket</text>
  
  <path d="M380 60 L80 70" stroke="#1d4e89" fill="none"/>
  <path d="M85 67 l-5 3 l2 -5 z" fill="#1d4e89"/>
  <text x="230" y="60" text-anchor="middle" font-size="7">HTTP 101 Switching Protocols</text>
  
  <path d="M80 90 L380 90" stroke="#4a8f3c" fill="none" stroke-width="2"/>
  <path d="M375 87 l5 3 l-5 3 z" fill="#4a8f3c"/>
  <text x="230" y="85" text-anchor="middle" font-size="7">Client sends Game Move</text>
  
  <path d="M380 110 L80 110" stroke="#b8541a" fill="none" stroke-width="2"/>
  <path d="M85 107 l-5 3 l5 3 z" fill="#b8541a"/>
  <text x="230" y="105" text-anchor="middle" font-size="7">Server pushes Game State</text>
</svg>

### The failure

- The failure is forgetting to send PING/PONG frames. If a user opens your web app and goes to lunch, the WebSocket connection might be completely silent for 30 minutes
- Load balancers (like AWS ALB or NGINX) are designed to drop idle connections to save memory. If a connection is completely silent for 60 seconds, the load balancer will silently sever it. When the user returns from lunch and clicks a button, the app crashes
- You must configure your WebSocket server to send a tiny "PING" frame every 30 seconds to keep the TCP connection alive through all the intermediate routers and load balancers
