# Build the Real Stack

## VPC in code

- Booklet 5's network — a VPC, public and private subnets across AZs, an internet gateway, NAT, route tables — is the first layer to express in HCL, because everything above it (cluster, database, load balancer) needs its subnet IDs. The whole point of this module is to turn that clickops diagram into a reviewed, repeatable artifact.
- The pattern that avoids copy-paste is **`for_each`/`count` over the availability zones**: declare the subnet shape once and let the tool fan it out across AZs. Spanning AZs is what buys the multi-AZ resilience from Booklet 5 — and here it's two lines, not twelve console clicks.

:::mint
```hcl
variable "azs" { default = ["us-east-1a", "us-east-1b", "us-east-1c"] }

resource "aws_subnet" "private" {
  for_each          = toset(var.azs)
  vpc_id            = aws_vpc.main.id
  availability_zone = each.key
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 4, index(var.azs, each.key))
}
output "private_subnet_ids" { value = [for s in aws_subnet.private : s.id] }
```
:::

- `cidrsubnet()` carves non-overlapping ranges out of the VPC CIDR automatically — no hand-computed masks (Booklet 2), no overlap bugs. The **output** then exports the subnet IDs so the cluster and database modules (next pages) consume them, which is exactly the module-composition handoff from Module 2.3.
- In practice most teams use the **`terraform-aws-modules/vpc`** registry module rather than hand-rolling all of this — it encodes NAT-per-AZ vs single-NAT (the cost trade from Booklet 5), the public/private split, and the right route tables and tags. You pass a CIDR and AZ list and get a correct VPC, with the gotchas already handled.

:::note
Tag subnets the way the consumers expect. EKS (next page) discovers subnets by **tag** — `kubernetes.io/role/elb` on public subnets for internet-facing load balancers, `kubernetes.io/role/internal-elb` on private ones — and Karpenter/controllers find subnets by tag too. A VPC that's correct but **untagged** leads to the maddening "cluster is up but no load balancer gets created" class of bug. Getting tags right in the network layer is what lets the layers above wire themselves automatically.
:::
