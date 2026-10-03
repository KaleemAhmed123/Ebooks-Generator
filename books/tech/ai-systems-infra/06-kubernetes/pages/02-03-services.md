## Services

- Pod IPs are **ephemeral** — every rollout, crash, or scale event gives new pods new IPs. A **Service** is the stable front for a changing set of pods: one **virtual IP (ClusterIP)** and a DNS name that never changes, load-balancing to whatever pods match its label selector *right now*.
- The wiring: the Service's selector (say `app: api`) is continuously evaluated into an **EndpointSlice** — the live list of ready pod IPs. kube-proxy (Module 1) turns that list into the kernel rules that rewrite "traffic to the ClusterIP" into "traffic to one of these pod IPs." Add a pod with the label and it appears in the slice and starts getting traffic; remove it and it drops out. **The selector, not a config edit, is the load-balancer membership.**

<svg viewBox="0 0 360 86" role="img" aria-label="A Service with a stable ClusterIP selects pods by label; its EndpointSlice tracks the ready pod IPs and kube-proxy load-balances to them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="96" height="26" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="56" y="42" text-anchor="middle" font-size="6.2">Service: api</text><text x="56" y="52" text-anchor="middle" font-size="5" fill="#777">ClusterIP 10.96.0.5</text>
  <rect x="134" y="30" width="96" height="26" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="182" y="42" text-anchor="middle" font-size="6">EndpointSlice</text><text x="182" y="52" text-anchor="middle" font-size="5" fill="#777">selector app=api</text>
  <rect x="266" y="8" width="86" height="18" rx="3" fill="#fff" stroke="#888"/><text x="309" y="20" text-anchor="middle" font-size="5.8">pod 10.1.4.7 ✓</text>
  <rect x="266" y="34" width="86" height="18" rx="3" fill="#fff" stroke="#888"/><text x="309" y="46" text-anchor="middle" font-size="5.8">pod 10.1.5.2 ✓</text>
  <rect x="266" y="60" width="86" height="18" rx="3" fill="#f7f9fc" stroke="#ccc"/><text x="309" y="72" text-anchor="middle" font-size="5.8" fill="#999">pod 10.1.6.9 (not ready)</text>
  <path d="M104 43 L134 43" stroke="#1a1a1a" marker-end="url(#s3)"/>
  <path d="M230 40 L266 17" stroke="#999" marker-end="url(#s3)"/><path d="M230 43 L266 43" stroke="#999" marker-end="url(#s3)"/>
  <defs><marker id="s3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The three Service **types** stack:
  - **ClusterIP** (default) — reachable only *inside* the cluster. The right choice for service-to-service traffic.
  - **NodePort** — opens the same high port on *every* node's IP, forwarding to the Service. Crude; mostly a building block.
  - **LoadBalancer** — asks the cloud-controller-manager (Module 1) to provision a real cloud load balancer (an AWS NLB/ALB — Booklet 5) pointing at the NodePorts. One per Service, so it gets expensive; external HTTP traffic usually enters through **Gateway API** instead (Module 4).
- A **headless Service** (`clusterIP: None`) skips the virtual IP and returns the pod IPs directly in DNS — what StatefulSets (next pages) use to give each pod its own addressable name.

:::note
`kube-proxy` load-balancing is **L4** (connection-level) and roughly random per connection — it does **not** understand HTTP, do retries, or balance per-request. Long-lived connections (gRPC, HTTP/2 — Booklet 2) pin to one pod and skew load badly. When you need per-request balancing, retries, or traffic splitting, that's the job of **Gateway API** or a service mesh (Booklet 11), not the Service.
:::
