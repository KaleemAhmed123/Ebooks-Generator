# Getting Traffic to the Right Place

## L4 vs L7 load balancing

- A load balancer spreads traffic across many backends. The deep question is **how much of the request it reads**, and that splits into two kinds:
  - **L4 (transport)** balances **connections** by IP and port. It forwards the raw TCP/UDP stream without looking inside — protocol-agnostic, extremely fast, minimal state. It cannot route by URL path or balance individual requests, because to it a connection is an opaque pipe. (AWS **NLB**.)
  - **L7 (application)** **terminates** the connection and reads **HTTP** — path, host, headers, cookies. It can route `/api` to one pool and `/static` to another, **balance per request**, retry failures, terminate TLS, inject headers, and rate-limit. It costs more CPU and understands only the protocols it speaks. (AWS **ALB**, nginx, Envoy.)

<svg viewBox="0 0 360 98" role="img" aria-label="An L4 balancer forwards whole connections by IP and port; an L7 balancer terminates and routes each HTTP request by path to different backend pools" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">L4 — by IP:port</text>
  <rect x="60" y="20" width="60" height="18" rx="3" fill="#dfeeee" stroke="#0f6e6e"/><text x="90" y="32" text-anchor="middle" font-size="5.8">L4 LB</text>
  <rect x="40" y="52" width="46" height="16" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="63" y="63" text-anchor="middle" font-size="5.4">backend</text>
  <rect x="94" y="52" width="46" height="16" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="117" y="63" text-anchor="middle" font-size="5.4">backend</text>
  <path d="M84 38 L63 52" stroke="#999" marker-end="url(#l2)"/><path d="M96 38 L117 52" stroke="#999" marker-end="url(#l2)"/>
  <text x="90" y="84" text-anchor="middle" font-size="5.2" fill="#777">opaque pipe · per connection</text>
  <text x="270" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">L7 — by HTTP path</text>
  <rect x="240" y="20" width="60" height="18" rx="3" fill="#dfeeee" stroke="#0f6e6e"/><text x="270" y="32" text-anchor="middle" font-size="5.8">L7 LB</text>
  <rect x="216" y="52" width="52" height="16" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="242" y="63" text-anchor="middle" font-size="5.4">/api pool</text>
  <rect x="276" y="52" width="60" height="16" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="306" y="63" text-anchor="middle" font-size="5.4">/static pool</text>
  <path d="M262 38 L242 52" stroke="#0f6e6e" marker-end="url(#l2)"/><path d="M278 38 L306 52" stroke="#0f6e6e" marker-end="url(#l2)"/>
  <text x="276" y="84" text-anchor="middle" font-size="5.2" fill="#777">reads request · per request</text>
  <defs><marker id="l2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The rule of thumb: **L4 when you need raw speed or non-HTTP protocols** (databases, custom TCP, or when you'll do L7 yourself inside); **L7 when you need routing, retries, TLS termination, or per-request fairness.** Kubernetes Gateway API (Booklet 6) is L7; a `Service` of type LoadBalancer is typically L4.
- The gRPC gotcha from Module 4 lands here: because gRPC pins one long HTTP/2 connection, an **L4** balancer sends all of a client's calls to a single backend. gRPC needs **L7** (request-aware) balancing to spread load — a concrete, interview-favourite consequence of the L4/L7 split.
