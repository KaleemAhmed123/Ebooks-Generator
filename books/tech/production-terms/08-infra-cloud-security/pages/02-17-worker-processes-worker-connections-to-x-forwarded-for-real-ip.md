## worker_processes & worker_connections

Nginx's concurrency ceiling is workers multiplied by connections per worker.
Both defaults are conservative, so the box refuses connections while its cores
sit idle.

Raise the file-descriptor limit in the same change. Each connection is a
descriptor, and a `worker_rlimit_nofile` below the configured ceiling makes the
new numbers decorative.

| Configuration | Concurrent connections |
|---|---|
| 1 worker × 512 (default) | ~512 |
| `worker_processes auto` on 8 cores × 4096 | ~32,768 |

## X-Forwarded-For / Real IP

Behind a proxy the application sees the proxy's address. Every per-address
decision — rate limits, audit logs, geo rules — is then made about that one
address.

Every request appears to come from `10.0.1.4`, so the first user to trip the
rate limiter throttles everyone at once. The proxy has to forward the original
address and the app has to be told to read it.

Trust the header only from your own proxy. Anywhere else it is a
client-supplied string, and an app trusting it unconditionally lets any caller
choose their own rate-limit bucket.

<svg viewBox="0 0 460 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without a forwarded header the application sees the proxy address 10.0.1.4; with X-Forwarded-For set at Nginx and trusted by the app it sees the real client address 1.2.3.4">
  <rect x="4" y="14" width="120" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="30" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">client 1.2.3.4</text>
  <line x1="126" y1="26" x2="142" y2="26" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M148 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="150" y="14" width="128" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="158" y="30" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Nginx 10.0.1.4</text>
  <line x1="280" y1="26" x2="296" y2="26" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M302 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="304" y="14" width="152" height="24" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="312" y="30" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">app — sees which?</text>
  <text x="4" y="58" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">no header: the app sees 10.0.1.4 and every user shares one rate-limit bucket</text>
  <text x="4" y="76" font-family="Consolas,monospace" font-size="8" fill="#3f7a33">proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</text>
  <text x="4" y="90" font-family="Georgia,serif" font-size="9" fill="#3f7a33">plus trust proxy in the app: it sees 1.2.3.4</text>
</svg>
