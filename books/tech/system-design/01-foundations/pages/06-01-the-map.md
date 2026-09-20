# Module 6 - The request lifecycle, end to end

## Where the milliseconds go

- A request is not `await fetch()`. It is a chain of layers, each with a latency floor and a timeout knob

<svg viewBox="0 0 460 110" role="img" aria-label="The full request path: client to DNS to TCP handshake to TLS handshake to load balancer to app server to connection pool to database and back, with typical latency at each hop" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="10" width="46" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="27" y="24" text-anchor="middle">client</text>
  <path d="M50 20 L66 20" stroke="#1a1a1a"/><path d="M66 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="70" y="10" width="40" height="20" rx="3" fill="none" stroke="#6b6b6b"/><text x="90" y="24" text-anchor="middle" fill="#6b6b6b">DNS</text>
  <path d="M110 20 L126 20" stroke="#1a1a1a"/><path d="M126 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="130" y="10" width="40" height="20" rx="3" fill="none" stroke="#6b6b6b"/><text x="150" y="24" text-anchor="middle" fill="#6b6b6b">TCP</text>
  <path d="M170 20 L186 20" stroke="#1a1a1a"/><path d="M186 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="190" y="10" width="40" height="20" rx="3" fill="none" stroke="#6b6b6b"/><text x="210" y="24" text-anchor="middle" fill="#6b6b6b">TLS</text>
  <path d="M230 20 L246 20" stroke="#1a1a1a"/><path d="M246 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="250" y="10" width="34" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="267" y="24" text-anchor="middle">LB</text>
  <path d="M284 20 L300 20" stroke="#1a1a1a"/><path d="M300 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="304" y="10" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="324" y="24" text-anchor="middle">app</text>
  <path d="M344 20 L360 20" stroke="#1a1a1a"/><path d="M360 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="364" y="10" width="40" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="384" y="24" text-anchor="middle">pool</text>
  <path d="M404 20 L420 20" stroke="#1a1a1a"/><path d="M420 20 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="424" y="10" width="30" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="439" y="24" text-anchor="middle">DB</text>
  <!-- latency annotations below -->
  <text x="90" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">0–200 ms</text>
  <text x="150" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">1 RTT</text>
  <text x="210" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">1 RTT</text>
  <text x="267" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">~50 µs</text>
  <text x="324" y="46" text-anchor="middle" font-size="7.5" fill="#1d4e89">your code</text>
  <text x="384" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">wait</text>
  <text x="439" y="46" text-anchor="middle" font-size="7.5" fill="#6b6b6b">~500 µs</text>
  <text x="230" y="62" text-anchor="middle" font-size="8" fill="#6b6b6b">← each layer has a timeout knob. If you set none, the default is "forever" →</text>
  <text x="230" y="76" text-anchor="middle" font-size="8" fill="#6b6b6b">DNS is cached after the first resolution. TCP+TLS are avoided on keep-alive connections</text>
  <text x="230" y="90" text-anchor="middle" font-size="8" fill="#6b6b6b">the first request pays the setup cost; subsequent requests on the same connection skip to LB</text>
</svg>

- First request to a new host: DNS + TCP + TLS + proxy + app + DB. On a 100 ms RTT link that is ~300 ms of setup before the app runs one line
- Subsequent requests on a kept-alive connection: proxy + app + DB. The setup cost drops to near zero

### The failure

- The engineer who thinks a request is the code inside the handler. The handler ran in 5 ms. The user saw 800 ms, because DNS was cold, TLS was a full handshake, and the connection pool was empty
