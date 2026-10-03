## Gateway API

- A `LoadBalancer` Service (Module 2) gives you one cloud LB per service and only L4. To route **HTTP** from outside — host/path routing, TLS termination, traffic splitting — you need an L7 entry point. For a decade that was **Ingress**; in 2026 the current standard is **Gateway API**, and knowing why it replaced Ingress is the point.
- **Ingress is frozen.** The core Ingress API is stable but receives **no new features** — everything beyond basic host/path routing was crammed into **controller-specific annotations**, so an Ingress was only portable until you needed anything real, and then it was a wall of `nginx.ingress.kubernetes.io/...` strings. (The widely-used community **Ingress-NGINX** controller is **retiring on March 31, 2026**, which pushed many teams to migrate.)
- **Gateway API** replaces annotations with **typed, role-separated resources** — it was designed around *who owns what*:

<svg viewBox="0 0 360 92" role="img" aria-label="Gateway API roles: a GatewayClass from the infra provider, a Gateway owned by the platform team defining listeners, and HTTPRoutes owned by app teams attaching routes to the gateway" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="34" width="92" height="26" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="54" y="46" text-anchor="middle" font-size="6">GatewayClass</text><text x="54" y="55" text-anchor="middle" font-size="4.8" fill="#777">infra provider</text>
  <rect x="128" y="34" width="92" height="26" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="174" y="46" text-anchor="middle" font-size="6">Gateway</text><text x="174" y="55" text-anchor="middle" font-size="4.8" fill="#777">platform: listeners/TLS</text>
  <rect x="248" y="12" width="104" height="22" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="300" y="23" text-anchor="middle" font-size="5.8">HTTPRoute (team A)</text><text x="300" y="31" text-anchor="middle" font-size="4.8" fill="#777">/shop → svc</text>
  <rect x="248" y="40" width="104" height="22" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="300" y="51" text-anchor="middle" font-size="5.8">HTTPRoute (team B)</text><text x="300" y="59" text-anchor="middle" font-size="4.8" fill="#777">/api → svc, 90/10 split</text>
  <path d="M100 47 L128 47" stroke="#1a1a1a" marker-end="url(#gw)"/><path d="M220 44 L248 23" stroke="#999" marker-end="url(#gw)"/><path d="M220 50 L248 51" stroke="#999" marker-end="url(#gw)"/>
  <text x="180" y="82" text-anchor="middle" font-size="5.4" fill="#777">one Gateway, many teams' routes — no shared annotation blob</text>
  <defs><marker id="gw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **GatewayClass** (what implementation — Envoy, Cilium, a cloud LB), **Gateway** (the actual listener + TLS, owned by the platform team), and **HTTPRoute** (host/path rules, header matching, weighted splits — owned by each app team and attached to the Gateway). Traffic splitting for canaries (Module 6) is a native field, not an annotation. As of **Gateway API v1.6 (June 2026)**, **TCPRoute/UDPRoute** are also GA, so raw L4 routing shares the same model.

:::note
The role separation is the real upgrade: a platform team owns one Gateway (certs, the public IP, listener policy) and app teams attach their own HTTPRoutes **without editing a shared object or holding cluster-wide permissions** — the multi-team story Ingress never had. This same Gateway API is the base for the **Gateway API Inference Extension** that routes LLM traffic in Booklet 10, so it's worth learning as the one ingress model going forward.
:::
