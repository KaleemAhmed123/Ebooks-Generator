### The details that decide whether it works

- **`wait-for-service-stability: true` is what makes the job fail on a bad deploy.** Without it the workflow reports success while ECS is still rolling back
- **The task definition is committed to the repository**, with the image as the only field the pipeline changes. Editing it in the console means the next deploy silently reverts it
- **Set a deployment circuit breaker** on the service, so a failing rollout rolls itself back automatically

```bash
aws ecs update-service --cluster production --service orders-api \
  --deployment-configuration 'deploymentCircuitBreaker={enable=true,rollback=true},minimumHealthyPercent=100,maximumPercent=200'
```

- `minimumHealthyPercent=100` with `maximumPercent=200` starts the full new set before stopping any of the old, which is a zero-downtime rollout
