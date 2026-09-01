## Subnets, routes and NAT

- A **subnet** is a slice of the VPC address range, and it lives in exactly one availability zone
- **A subnet is public only because its route table sends `0.0.0.0/0` to an internet gateway.** There is no other difference

| Component | Does |
|---|---|
| **internet gateway** | two-way internet for resources with a public address |
| **NAT gateway** | outbound only, for private subnets. Nothing can start a connection inward |
| **route table** | where traffic for a destination goes |
| **VPC endpoint** | reach S3, ECR or SQS without leaving the AWS network at all |

### Sizing the ranges

```text
VPC        10.0.0.0/16     65,536 addresses
public     10.0.0.0/24     256, of which AWS reserves 5
app        10.0.10.0/24
data       10.0.20.0/24
```

- **A `/16` for the VPC and `/24` per subnet is a sensible default.** Larger subnets for a workload that scales to hundreds of tasks
- **Do not overlap with your office network** or a future VPN peering becomes impossible
