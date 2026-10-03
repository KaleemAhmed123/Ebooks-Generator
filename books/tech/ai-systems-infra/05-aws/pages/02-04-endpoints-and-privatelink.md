## VPC endpoints and PrivateLink

- By default, a private subnet reaching an AWS service like **S3** sends that traffic out through the **NAT Gateway and over the public internet** to the service's public endpoint — paying NAT data charges (Module 2.2) and leaving the VPC. **VPC endpoints** fix both: they give you a **private path** to AWS services that never leaves the AWS network, with no internet, no IGW, no NAT.
- Two kinds:
  - **Gateway endpoints** — for **S3 and DynamoDB** only. They're a **route-table entry** (traffic to S3's prefix goes to the endpoint), they're **free**, and they immediately take that traffic off NAT. There is almost no reason *not* to add S3 and DynamoDB gateway endpoints to a VPC — it's free and cuts cost and exposure at once.
  - **Interface endpoints** — for most other services (and your own services). They put an **elastic network interface (ENI)** with a private IP into your subnet, backed by **PrivateLink**; your calls resolve to that private IP. These cost an hourly rate per endpoint per AZ plus a small data charge — still usually cheaper and safer than routing sensitive API traffic through NAT and the internet.
- **PrivateLink** generalises the interface endpoint: it lets you expose **your own** service privately to **other VPCs or accounts** without peering the networks or exposing anything publicly. A SaaS vendor, or another team's platform, appears as a private ENI in *your* VPC — a one-way, private, account-to-account connection.

:::note
Why this belongs in an infra engineer's toolkit, not just a cost footnote: endpoints are **security and cost at the same time**. Traffic to S3/Dynamo over a gateway endpoint **stays on AWS's backbone** (not the public internet), can be **restricted by endpoint policy** (only these buckets, only from this VPC), and **drops off the NAT bill**. "Add S3/DynamoDB gateway endpoints and move sensitive service calls to interface endpoints" is a standard hardening-and-savings move you'll make on nearly every real VPC — and it's trivial to express in Terraform (Booklet 7).
:::

### Module 2 — checkpoint
- **Key concepts:** VPC CIDR → subnets per AZ · public vs private = routing · IGW (in/out) vs NAT GW (outbound-only, per-AZ, data cost) · SG (stateful, allow-only, per-resource, SG-references) vs NACL (stateless, ordered allow/deny, subnet, must allow return) · gateway vs interface endpoints + PrivateLink.
- **Task + questions:** design subnets/routes for a web tier + private DB across 2 AZs; then explain the stateless-NACL return-traffic bug and how S3 gateway endpoints cut the NAT bill.
- **Next:** Module 3 — compute and edge.
