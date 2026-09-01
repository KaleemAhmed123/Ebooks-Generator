### AWS-side checks

```bash
aws elbv2 describe-target-health --target-group-arn <arn>
aws elbv2 describe-load-balancers --query 'LoadBalancers[].{Name:LoadBalancerName,DNS:DNSName,State:State.Code}'
aws ec2 describe-security-groups --group-ids sg-app --query 'SecurityGroups[].IpPermissions'
aws ec2 describe-route-tables --filters Name=association.subnet-id,Values=subnet-a
aws acm describe-certificate --certificate-arn <arn> --query 'Certificate.Status'
aws wafv2 get-sampled-requests --web-acl-arn <arn> --rule-metric-name rate-limit \
  --scope REGIONAL --time-window StartTime=...,EndTime=... --max-items 20
```

### The order to check in

1. **Is DNS resolving to what you expect?** `dig +short`
2. **Is the target group healthy?** `describe-target-health` names the reason
3. **Is the security group open on that port?** By far the most common cause
4. **Does the app answer on localhost?** If yes, the problem is entirely network
5. **VPC flow logs**, when nothing above explains it
