## Getting onto a machine without SSH

- SSH means an open port, a key to distribute and rotate, and usually a bastion host to maintain
- **Session Manager gives a shell with none of those.** The SSM agent on the instance polls outward, so no inbound port is open at all

```bash
aws ssm start-session --target i-0abc123

# port forwarding: reach a private RDS instance from your laptop
aws ssm start-session --target i-0abc123 \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters '{"host":["orders.abc.ap-south-1.rds.amazonaws.com"],"portNumber":["5432"],"localPortNumber":["5433"]}'

# run a command on many instances at once
aws ssm send-command \
  --document-name AWS-RunShellScript \
  --targets Key=tag:Role,Values=orders-api \
  --parameters 'commands=["docker ps"]'

aws ssm list-command-invocations --command-id <id> --details
```

### What it needs

- The SSM agent, preinstalled on Amazon Linux and Ubuntu images
- `AmazonSSMManagedInstanceCore` on the instance role
- Outbound access to the SSM endpoints, through NAT or through VPC endpoints
