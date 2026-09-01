## Spending less

### The order that actually pays

1. **Delete what is unused.** Old volumes, idle load balancers, forgotten NAT gateways, staging that runs at night
2. **Right-size.** Most instances are chosen once and never revisited
3. **Commit to what is steady.** Savings Plans on the baseline
4. **Use Spot for what can be interrupted**
5. **Fix the architecture**, such as VPC endpoints removing NAT charges

```bash
aws ce get-rightsizing-recommendation --service AmazonEC2
aws compute-optimizer get-ec2-instance-recommendations
aws ec2 describe-volumes --filters Name=status,Values=available   # unattached, still billed
aws ec2 describe-addresses --query 'Addresses[?AssociationId==null]'  # idle elastic IPs
```

### Commitments

| Instrument | Discount | Flexibility |
|---|---|---|
| **Compute Savings Plan** | up to about 66 percent | any region, instance family, EC2, Fargate or Lambda |
| EC2 Instance Savings Plan | slightly more | one family in one region |
| Reserved Instances | similar | RDS and ElastiCache, where Savings Plans do not apply |

- **Compute Savings Plans are the safe choice.** Commit to a low hourly baseline you are certain of, and pay on demand above it
- **Never commit to peak capacity.** A one year commitment for a load that shrinks is money spent on nothing
