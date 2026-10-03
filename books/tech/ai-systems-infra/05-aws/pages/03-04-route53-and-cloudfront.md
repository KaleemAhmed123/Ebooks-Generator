## Route 53 and CloudFront

- **Route 53** is AWS's **DNS** (Booklet 2), and it's more than name→IP — its **routing policies** are a global traffic-management tool:
  - **Simple** — one record, one answer.
  - **Weighted** — split traffic by percentage (10% to a canary, Booklet 8).
  - **Latency-based** — send each user to the region with the **lowest latency** to them.
  - **Geolocation** — route by the user's country/region (data residency, localisation).
  - **Failover** — paired with **health checks**, send traffic to a standby when the primary is unhealthy — the DNS half of disaster recovery (Booklet 12).
- Health checks make Route 53 active: it probes your endpoints and **stops returning** unhealthy ones, so DNS itself participates in availability. (Remember Booklet 2's TTL caveat — DNS failover is only as fast as clients' cached TTLs expire.)

- **CloudFront** is AWS's **CDN** (Booklet 2): a global network of **edge locations** that cache your content close to users and terminate their TLS nearby, cutting latency by shortening distance. Its **origin** is typically an **S3 bucket** (static sites/assets) or an **ALB** (dynamic content). It also provides **edge compute** (CloudFront Functions / Lambda@Edge) and is the attachment point for **AWS Shield** (DDoS protection) and **WAF** (Booklet 11).
- Put together, they're the front door of a global system: **Route 53** decides *which region/endpoint* a user resolves to (by latency, geo, or health), and **CloudFront** serves cacheable content from the *nearest edge* and forwards the rest to the origin over AWS's backbone.

:::note
This closes Booklet 2's latency story on AWS. RTT is set by distance, so you fight it by **not making the trip**: CloudFront serves cached bytes from an edge near the user with **zero origin round-trip**, and keeps a warm connection back to origin for the rest. Route 53 latency-based routing then ensures the *origin* a user does reach is their closest region. For a global product on AWS, this pair — plus multi-region deployment (Booklet 12) — is how "fast everywhere" is actually built.
:::

### Module 3 — checkpoint
- **Key concepts:** EC2 families (m/c/r/i/p-g) + sizes + EBS gp3 · on-demand/savings/**spot** (reclaim risk; stateless only) · Lambda (scale-to-zero, 15-min, cold start) vs ECS/Fargate (low-ops containers) vs EKS (Kubernetes when needed) · ALB (L7/HTTP) vs NLB (L4/TCP, gRPC caveat) · Route 53 routing policies + health checks · CloudFront CDN + edge.
- **Task + questions:** choose compute for (a) image-thumbnail on upload, (b) a steady REST API, (c) GPU model serving; then say why gRPC behind an NLB hot-spots one pod.
- **Next:** Module 4 — data and messaging services.
