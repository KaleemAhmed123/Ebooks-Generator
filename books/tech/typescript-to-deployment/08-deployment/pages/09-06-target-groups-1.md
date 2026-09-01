## Target groups and health checks

```bash
aws elbv2 create-target-group --name tg-api \
  --protocol HTTP --port 3000 --vpc-id vpc-abc \
  --target-type ip \
  --health-check-path /ready \
  --health-check-interval-seconds 15 \
  --healthy-threshold-count 2 --unhealthy-threshold-count 3 \
  --matcher HttpCode=200

aws elbv2 describe-target-health --target-group-arn <arn>
```

| Setting | Effect |
|---|---|
| `health-check-path` | **point it at readiness, not liveness** |
| `interval` and `unhealthy-threshold` | how long a broken target keeps getting traffic |
| `healthy-threshold` | how long a recovered target waits before returning |
| `deregistration_delay` | how long in-flight requests get after removal |

### Draining, which is what makes a deploy clean

```bash
aws elbv2 modify-target-group-attributes --target-group-arn <arn> \
  --attributes Key=deregistration_delay.timeout_seconds,Value=45
```

- On removal the ALB stops sending **new** requests and lets existing ones finish for this long
- **It must exceed your longest normal request.** The default 300 seconds makes deploys slow; 30 to 60 is usually right
- The sequence that gives a zero-downtime deploy: deregister, drain, `SIGTERM`, the process finishes and exits
