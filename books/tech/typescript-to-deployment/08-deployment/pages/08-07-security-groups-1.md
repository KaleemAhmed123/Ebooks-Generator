## Security groups

- A **security group** is a stateful firewall attached to a resource, not to a subnet
- **Stateful** means a reply to an allowed inbound request is automatically allowed out. You write one rule, not two
- Everything is denied unless a rule allows it, and there are no deny rules at all

### The pattern that matters

```bash
# the database accepts connections from the application group, by reference
aws ec2 authorize-security-group-ingress \
  --group-id sg-database \
  --protocol tcp --port 5432 \
  --source-group sg-app
```

- **Reference the other security group, never an address range.** Instances come and go, and the rule stays correct with no maintenance
- That single habit is the difference between a network that stays correct and one that accumulates stale address rules

| Layer | Allows from |
|---|---|
| `sg-alb` | `0.0.0.0/0` on 443 |
| `sg-app` | `sg-alb` on 3000 |
| `sg-database` | `sg-app` on 5432 |
| `sg-cache` | `sg-app` on 6379 |

- **Nothing in that chain has a rule for the internet except the load balancer.** That is the whole security model, in four lines
