## Auto Scaling Groups

- One instance is a single point of failure and a fixed capacity. An **Auto Scaling Group** keeps a target number of instances alive across zones
- It replaces an unhealthy instance automatically, which is what turns a machine failure from an incident into a graph

```bash
aws ec2 create-launch-template --launch-template-name orders-api \
  --launch-template-data file://template.json

aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name orders-api \
  --launch-template LaunchTemplateName=orders-api,Version='$Latest' \
  --min-size 2 --max-size 10 --desired-capacity 2 \
  --vpc-zone-identifier subnet-a,subnet-b \
  --target-group-arns arn:aws:elasticloadbalancing:... \
  --health-check-type ELB --health-check-grace-period 90
```

| Setting | Why it matters |
|---|---|
| `min-size 2` | **never one.** One instance means a deploy or a failure is an outage |
| `vpc-zone-identifier` with two subnets | spreads across zones |
| `health-check-type ELB` | uses the load balancer's check, not just "is the VM booted" |
| `health-check-grace-period` | must exceed boot plus warm-up, or it kills instances while they start |
