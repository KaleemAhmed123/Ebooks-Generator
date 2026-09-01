### Scaling on the right signal

```bash
aws autoscaling put-scaling-policy --auto-scaling-group-name orders-api \
  --policy-name cpu-target --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{"TargetValue":60,"PredefinedMetricSpecification":{"PredefinedMetricType":"ASGAverageCPUUtilization"}}'
```

- **Target tracking is the one to use.** You state the number you want held and AWS works out the steps
- **CPU is often the wrong signal for a Node API**, which is usually waiting on I/O. Request count per target, or a queue depth, tracks reality better

### Rolling a new image through

```bash
aws autoscaling start-instance-refresh --auto-scaling-group-name orders-api \
  --preferences MinHealthyPercentage=90,InstanceWarmup=90
```

- **An instance refresh is the EC2 rolling deploy.** It replaces instances in batches, waiting for health checks between them
