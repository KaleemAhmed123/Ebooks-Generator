## ALB and NLB

- AWS's two main load balancers are Booklet 2's L7-vs-L4 distinction as managed products:
  - **ALB** (Application Load Balancer) — **L7 / HTTP(S)**. It reads the request and routes by **host and path** (`/api` → one target group, `app.example.com` → another), **terminates TLS**, runs **health checks**, and supports WebSocket and HTTP/2. Targets are grouped into **target groups** (a set of instances/IPs/Lambda) that it balances across and health-checks. This is what sits in front of virtually every HTTP service.
  - **NLB** (Network Load Balancer) — **L4 / TCP-UDP**. It forwards connections with **ultra-low latency** and handles **millions** of them, offers a **static IP** per AZ, and **preserves the client source IP**. It doesn't understand HTTP, so no path routing — but for non-HTTP protocols, extreme performance, or when you need a fixed IP, it's the one.
- Choosing: **ALB for HTTP apps** (the default for web/REST), **NLB for TCP/UDP, non-HTTP, extreme throughput/latency, or a required static IP**. A common combo is NLB → ingress/proxy inside the cluster, or ALB for public HTTP and NLB for internal gRPC.

:::note
The gRPC subtlety from Booklet 2 reappears as an AWS choice. gRPC pins one long **HTTP/2** connection, so an **NLB (L4)** will send **all** of a client's calls to a single backend — it balances connections, not requests. For gRPC you want **request-aware L7** balancing: an **ALB** (which supports HTTP/2 to targets) or an in-cluster L7 proxy / service mesh (Booklets 6, 11) that load-balances individual gRPC calls. Putting gRPC behind a plain L4 NLB and wondering why one pod is hot is a classic misconfiguration — the fix is moving the balancing decision up to L7.
:::

- Both integrate with the rest of the stack: ALB/NLB are the AWS implementation of a **Kubernetes `Service` of type LoadBalancer** or a **Gateway** (Booklet 6) via the AWS Load Balancer Controller, they register/deregister targets as your auto-scaling group or pods change, and they're where **TLS certs** (from ACM) and **WAF** (Booklet 11) attach. In practice you rarely click these together by hand — you declare them in Terraform or let the cluster create them (Booklet 7).
