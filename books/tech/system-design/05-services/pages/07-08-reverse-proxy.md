## The reverse proxy

- A Load Balancer distributes traffic. A Reverse Proxy sits in front of a server and protects it. Modern software (like NGINX or Envoy) often does both at the same time
- Why put a proxy in front of a perfectly good API service?
  - **TLS Termination:** Decrypting HTTPS is CPU intensive. The proxy does the math, then speaks plain HTTP to your internal API
  - **Compression:** The proxy can gzip responses so your API doesn't have to
  - **Static Files:** The proxy can serve images directly from disk faster than a Node.js process can
  - **Buffering:** If a client on a slow 3G network takes 10 seconds to download a 1MB JSON response, the proxy buffers the response. Your API sends the 1MB to the proxy in 5ms and immediately moves on to the next user, while the proxy slowly dribbles the data to the 3G client

<svg viewBox="0 0 460 140" role="img" aria-label="Reverse proxy. Client speaks slow HTTPS to proxy. Proxy speaks fast HTTP to API." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="40" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="73" text-anchor="middle">Client</text>
  
  <rect x="150" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="73" text-anchor="middle">Reverse Proxy</text>
  
  <rect x="320" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="360" y="73" text-anchor="middle">API Server</text>
  
  <path d="M60 70 L150 70" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M145 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="105" y="65" text-anchor="middle" font-size="7">Slow HTTPS</text>
  
  <path d="M230 70 L320 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M315 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="275" y="65" text-anchor="middle" font-size="7">Fast HTTP</text>
</svg>

### The failure

- The failure is the buffering feature breaking modern protocols. If your API is trying to stream a large file to the user, or stream real-time events via Server-Sent Events (SSE), the proxy will wait until the *entire* stream is finished before sending a single byte to the client
- The user sees an infinite loading spinner. To fix this, you must explicitly configure the proxy to disable buffering for streaming routes (e.g., in NGINX, by setting `proxy_buffering off` or having the API emit the `X-Accel-Buffering: no` header)
