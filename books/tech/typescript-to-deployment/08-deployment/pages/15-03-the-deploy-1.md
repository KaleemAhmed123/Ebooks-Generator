## The deploy

### On a VPS

```bash
ssh prod
cd /srv/app

# silence the alert that will fire during the restart
amtool silence add alertname=HighErrorRate --duration=10m --comment="deploy $SHA"

./deploy.sh <git-sha>          # Module 3: pull, migrate, up --wait, health check, rollback on failure

docker compose ps
docker compose logs --tail 50 api
```

### On ECS

```bash
aws ecs update-service --cluster production --service orders-api \
  --task-definition orders-api:42

aws ecs wait services-stable --cluster production --services orders-api

aws ecs describe-services --cluster production --services orders-api \
  --query 'services[0].{running:runningCount,desired:desiredCount,events:events[:3].message}'
```

### Watch these three things while it rolls

```promql
sum(rate(http_requests_total{status=~"5.."}[1m]))          # error rate
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[1m])))
count(up{job="api"} == 1)                                   # healthy instances
```

- **Healthy instance count is the one people forget.** A rollout where new tasks never pass their health check shows as a flat count, not as an error
