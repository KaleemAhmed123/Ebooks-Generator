## Reuse the connection, agree on the idle timeout

- Opening a new TCP+TLS connection for every request wastes two round trips. **Keep-alive** reuses an open connection for the next request
- The trap: the server and the load balancer must agree on how long an idle connection stays open. If the server closes it first, the LB reuses a socket the server just shut — the client sees a sporadic 502

<svg viewBox="0 0 460 80" role="img" aria-label="Timeline: server idle timeout at 5 seconds closes the connection; the load balancer at 60 seconds sends a request on the now-closed socket; the server replies with a RST; the client sees a 502" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <line x1="60" y1="20" x2="440" y2="20" stroke="#e0e0e4"/>
  <text x="8" y="24" font-size="8" fill="#6b6b6b">server</text>
  <rect x="60" y="16" width="80" height="8" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="12" text-anchor="middle" font-size="7" fill="#6b6b6b">last request</text>
  <line x1="190" y1="16" x2="190" y2="28" stroke="#b8541a"/>
  <text x="190" y="38" text-anchor="middle" font-size="7" fill="#b8541a">server closes (5 s idle)</text>
  <line x1="60" y1="54" x2="440" y2="54" stroke="#e0e0e4"/>
  <text x="8" y="58" font-size="8" fill="#6b6b6b">LB</text>
  <rect x="60" y="50" width="80" height="8" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="300" y="50" width="60" height="8" rx="2" fill="none" stroke="#b8541a"/>
  <text x="330" y="46" text-anchor="middle" font-size="7" fill="#b8541a">new req → RST → 502</text>
  <text x="380" y="68" text-anchor="end" font-size="7" fill="#6b6b6b">LB thinks socket is alive (60 s timeout)</text>
</svg>

- **Node 24** defaults: `keepAliveTimeout` 5 seconds. A load balancer typically holds connections for 60 seconds. The server closes first → the race
- A fix is in Node's `main` branch: the default becomes 65 seconds. As of 2026-09, it is unreleased. Until then, set `server.keepAliveTimeout = 65_000` manually
- `http.globalAgent` uses keep-alive with a 5 s timeout since Node v19

### The failure

- Intermittent 502s that appear only under low traffic. Under load, connections are always busy and never idle. When traffic dips, the 5-second window opens, and the race fires
