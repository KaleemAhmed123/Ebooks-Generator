## The ECS service

```bash
aws ecs create-service \
  --cluster production --service-name orders-api \
  --task-definition orders-api:42 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-a,subnet-b],securityGroups=[sg-app],assignPublicIp=DISABLED}' \
  --load-balancers 'targetGroupArn=<arn>,containerName=api,containerPort=3000' \
  --health-check-grace-period-seconds 60 \
  --deployment-configuration 'deploymentCircuitBreaker={enable=true,rollback=true},minimumHealthyPercent=100,maximumPercent=200' \
  --enable-execute-command
```

| Setting | Does |
|---|---|
| `assignPublicIp=DISABLED` | tasks stay private and reach out through NAT |
| `deploymentCircuitBreaker` | **a failing rollout rolls itself back** |
| `minimumHealthyPercent=100` | never drops below full capacity during a deploy |
| `maximumPercent=200` | may double capacity briefly, which is what allows the above |
| `enable-execute-command` | lets you open a shell in a running task |
