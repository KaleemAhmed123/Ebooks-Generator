# Module 8 - AWS foundations

## Regions, zones and who is responsible

- A **region** is a geographic area, such as `ap-south-1` in Mumbai. Regions are fully independent: separate data, separate failures, separate endpoints
- An **availability zone** is one or more data centers inside a region, isolated from the others by power and network, and a few milliseconds apart
- **Spreading across zones is how a service survives a data center failure.** Spreading across regions is a much larger project and rarely the first step

| Choice | Driven by |
|---|---|
| which region | where the users are, where the law says data must live, and price |
| how many zones | two at minimum. Three for anything with a quorum |
| multiple regions | a regulatory requirement, or a recovery objective measured in minutes |

### The shared responsibility model

- **AWS secures the cloud.** Hardware, the hypervisor, physical access, the managed service software
- **You secure what is in it.** Your data, your IAM policies, your security groups, your patching on EC2, your application
- A public S3 bucket is not an AWS failure. Neither is a security group open to the world

### Global against regional

- **Global:** IAM, Route 53, CloudFront, WAF for CloudFront, and the billing console
- **Regional:** almost everything else, including EC2, ECS, RDS, S3 buckets, SQS and Secrets Manager
- **A certificate for CloudFront must be in `us-east-1`**, whatever region the rest of the service lives in. That single rule costs people an afternoon

### Naming things

- Every resource has an **ARN**, such as `arn:aws:ecs:ap-south-1:123456789012:service/production/orders-api`
- Policies are written against ARNs, so getting comfortable reading them is most of getting comfortable with IAM
