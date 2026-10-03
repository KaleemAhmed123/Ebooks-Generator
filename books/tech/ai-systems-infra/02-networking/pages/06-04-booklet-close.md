## Booklet 2 — what you can now do

- **Localise any "A can't reach B" to a layer** — link, IP, transport, or application — and run the one tool that proves which one it is, instead of guessing.
- Explain the real cost of **handshakes** (TCP's 1 RTT + TLS), and why **connection reuse, keep-alive, pooling, and CDNs** are the highest-leverage latency wins there are.
- Reason through **HTTP/1.1 → 2 → 3** (and the head-of-line blocking that drove each step), **gRPC** as HTTP/2 + protobuf behind the control planes, and **WebSocket vs SSE** — including SSE for **LLM token streaming** (Booklet 10).
- Decode **p99 latency** into phases with `curl -w`, and diagnose the classic **cross-AZ N+1 fan-out** that turns 1 ms hops into whole seconds.
- See the cluster network through **eBPF/Hubble** — flows, drops, and latency — the thread that returns as the CNI (Booklet 6), observability (Booklet 8), and runtime security (Booklet 11).

<svg viewBox="0 0 360 64" role="img" aria-label="The booklet's arc: from the layered model and IP, through TCP/UDP and DNS/TLS, to HTTP and load balancing, down to eBPF-based debugging" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="24" width="60" height="18" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="38" y="35" text-anchor="middle">layers · IP</text>
  <rect x="78" y="24" width="60" height="18" rx="2" fill="#dfeeee" stroke="#0f6e6e"/><text x="108" y="35" text-anchor="middle">TCP/UDP</text>
  <rect x="148" y="24" width="60" height="18" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="178" y="35" text-anchor="middle">DNS · TLS</text>
  <rect x="218" y="24" width="64" height="18" rx="2" fill="#dfeeee" stroke="#0f6e6e"/><text x="250" y="35" text-anchor="middle">HTTP · LB</text>
  <rect x="292" y="24" width="60" height="18" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="322" y="35" text-anchor="middle">eBPF debug</text>
  <path d="M68 33 L78 33" stroke="#999" marker-end="url(#z1)"/><path d="M138 33 L148 33" stroke="#999" marker-end="url(#z1)"/><path d="M208 33 L218 33" stroke="#999" marker-end="url(#z1)"/><path d="M282 33 L292 33" stroke="#999" marker-end="url(#z1)"/>
  <defs><marker id="z1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Next booklet:** *Distributed Systems: Reasoning About Failure* — once services can talk, what breaks when they must **agree, replicate, and survive partial failure** across the unreliable network you just learned to debug.
