### Scaling

```bash
aws application-autoscaling register-scalable-target \
  --service-namespace ecs --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/production/orders-api --min-capacity 2 --max-capacity 20

aws application-autoscaling put-scaling-policy \
  --policy-name rps --policy-type TargetTrackingScaling \
  --service-namespace ecs --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/production/orders-api \
  --target-tracking-scaling-policy-configuration '{"TargetValue":1000,"PredefinedMetricSpecification":{"PredefinedMetricType":"ALBRequestCountPerTarget","ResourceLabel":"app/alb/xxx/targetgroup/tg-api/yyy"}}'
```

### Operating it

```bash
aws ecs execute-command --cluster production --task <task-id> \
  --container api --interactive --command "/bin/sh"

aws ecs describe-services --cluster production --services orders-api \
  --query 'services[0].{running:runningCount,desired:desiredCount,events:events[:5].message}'

aws logs tail /ecs/orders-api --follow --since 10m
```

- **`describe-services` events is the first place to look** when tasks will not start. It names the reason in plain language
