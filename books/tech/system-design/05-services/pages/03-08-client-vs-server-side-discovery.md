## Client-side vs server-side discovery

- Once the registry has answered "which instances", something picks one. **Client-side**: the caller receives the whole list and chooses, so the balancing logic lives in every caller. **Server-side**: the caller sends to one stable address, a virtual IP or a proxy, and that address chooses. Kubernetes has both: a ClusterIP Service is server-side, a virtual IP that kube-proxy programs into iptables, IPVS or nftables from the EndpointSlices; a headless Service (`clusterIP: None`) is client-side, DNS returns the pods' own A/AAAA records and the caller picks

| | Client-side | Server-side |
| :--- | :--- | :--- |
| **who picks** | the caller, from the full list | a proxy or a virtual IP, from its own view of the list |
| **hops** | none extra: caller to instance | one, through the proxy, or none for a kernel-programmed VIP |
| **logic lives in** | every client library, in every language | one place, upgraded once |
| **algorithm** | whatever the library does: round robin, least-request, P2C (Module 7, pages 3–4) | whatever the proxy does, usually richer: outlier detection, slow start, retries with budgets (Module 4, page 2) |
| **failover** | the caller sees the failure and picks another instance at once | the proxy must notice first, by probe or by observed failures (Module 7, page 5) |
| **Kubernetes form** | headless Service, `clusterIP: None`; gRPC clients often want this to balance per connection | ClusterIP Service; `sessionAffinity: ClientIP` pins a client for `timeoutSeconds`, default 10 800 |

- Client-side is right when the caller must know the instances: a gRPC client spreading streams over one connection per instance, a sharded cache where the key picks the node (booklet 02), a socket tier (Module 12, page 8). Everything else takes the stable address. The mesh (page 9) is client-side placement with server-side uniformity: one proxy implementation beside every caller

### The failure

- Client-side balancing across twelve languages with twelve bugs. Each library retries differently, one ignores health, one never refreshes its list, and an outage that a single proxy would have absorbed becomes twelve different partial failures, debugged by twelve teams. The logic that decides where a request goes is written once, or it is wrong somewhere
