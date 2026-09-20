## Client-side vs server-side discovery

- Once the IPs are discovered, someone has to pick one to route the traffic to. This happens on the client side or the server side
- **Server-side discovery:** The client talks to a fixed proxy or VIP (Virtual IP). The proxy asks the registry and routes the traffic. Kubernetes `ClusterIP` works this way via `kube-proxy`
- **Client-side discovery:** The client asks the registry for all IPs and runs a load balancing algorithm (like round-robin) locally to pick one. A Kubernetes "headless service" (`clusterIP: None`) returns all IPs directly to the client

| | Client-side Discovery | Server-side Discovery |
|---|---|---|
| **Latency** | Faster (one less network hop) | Slower (passes through a proxy) |
| **Logic** | Client must implement load balancing and retries | Client is dumb, just calls a fixed IP |
| **Failover** | Client spots a failure and immediately picks another IP | Proxy must detect the failure before it routes traffic |

### The failure

- The failure of client-side discovery is language proliferation. If you have services written in Node, Python, Go, and Rust, you must implement the exact same load balancing and retry logic in four different client libraries
- If one library has a bug in its failover logic, that specific subset of your microservices will crash during an outage. Server-side discovery centralizes this logic into a single, robust proxy
