## Design for 10M requests/day

- The interview-defining prompt: *"design and operate this on AWS."* Start by **turning the headline into rates** (Booklet 3's Little's Law). 10M requests/day ≈ **116 req/s average** — but traffic isn't flat; a peak of **5–10×** means you design for **~1,000 req/s**. At 100 ms average latency, Little's Law says `1000 × 0.1 = 100` requests in flight — so ~100 concurrent handlers, which sizes your pool, your pods, and your database connections. Numbers first; boxes second.

<svg viewBox="0 0 360 104" role="img" aria-label="Reference AWS architecture: Route 53 to CloudFront to an ALB, into stateless app pods on EKS across AZs that autoscale, backed by RDS Multi-AZ, ElastiCache, and SQS, with S3 for assets" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.2" fill="#1a1a1a">
  <rect x="6" y="44" width="46" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="29" y="55" text-anchor="middle">Route 53</text>
  <rect x="60" y="44" width="52" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="86" y="55" text-anchor="middle">CloudFront</text>
  <rect x="120" y="44" width="34" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="137" y="55" text-anchor="middle">ALB</text>
  <rect x="166" y="30" width="70" height="44" rx="3" fill="#fdfaf3" stroke="#8a5a00"/><text x="201" y="27" text-anchor="middle" fill="#8a5a00">EKS app (2–3 AZ)</text><text x="201" y="46" text-anchor="middle">stateless pods</text><text x="201" y="56" text-anchor="middle" font-size="5.6" fill="#777">HPA autoscale</text>
  <rect x="250" y="8" width="104" height="14" rx="2" fill="#efe6d3" stroke="#8a5a00"/><text x="302" y="18" text-anchor="middle">RDS Multi-AZ + replicas</text>
  <rect x="250" y="26" width="104" height="14" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="302" y="36" text-anchor="middle">ElastiCache (hot reads)</text>
  <rect x="250" y="44" width="104" height="14" rx="2" fill="#efe6d3" stroke="#8a5a00"/><text x="302" y="54" text-anchor="middle">SQS → async workers</text>
  <rect x="250" y="62" width="104" height="14" rx="2" fill="#efe6d3" stroke="#8a5a00"/><text x="302" y="72" text-anchor="middle">S3 (assets, via CF)</text>
  <path d="M52 52 L60 52" stroke="#1a1a1a" marker-end="url(#da)"/><path d="M112 52 L120 52" stroke="#1a1a1a" marker-end="url(#da)"/><path d="M154 52 L166 52" stroke="#1a1a1a" marker-end="url(#da)"/><path d="M236 46 L250 34" stroke="#999" marker-end="url(#da)"/><path d="M236 52 L250 52" stroke="#999" marker-end="url(#da)"/>
  <defs><marker id="da" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The architecture, each piece earning its place:
  - **CloudFront** caches static/edge content so the origin never sees most requests — the cheapest request is one you don't serve (Booklets 2, 5.3).
  - **Route 53 → ALB → stateless app on EKS** across **2–3 AZs**, behind an **HPA** (Booklet 6) that scales pods on load; stateless so any pod serves any request and scaling is trivial.
  - **RDS Multi-AZ** (HA) with **read replicas** for read scale, **or DynamoDB** if the access pattern fits (Booklet 4); **ElastiCache/Valkey** absorbs hot reads so the database isn't the bottleneck.
  - **SQS → workers** moves slow work (emails, thumbnails, exports) **off** the request path, so the synchronous p99 stays low (Booklets 3, 4).
  - **CloudWatch alarms + billing alarm** (Module 5–6) so it's operable and won't surprise you on cost.
- **Operate it** with the rest of the series: SLOs and tracing (Booklet 8), headroom below Little's Law's knee (Booklet 3), spot for the stateless tier and endpoints to dodge NAT (Modules 2, 6). The pattern generalises — swap the app tier for **GPU inference** and you have the AI-serving architecture of Booklets 9–10.
