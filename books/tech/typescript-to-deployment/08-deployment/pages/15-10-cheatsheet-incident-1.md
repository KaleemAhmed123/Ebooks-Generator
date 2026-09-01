## Cheatsheet: the incident

### The first sixty seconds

```bash
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' https://api.example.com/ready
gh run list --workflow deploy.yml --limit 3          # was there a deploy
ssh prod 'df -h / && free -h'                        # disk and memory
ssh prod 'docker compose ps'                         # anything restarting
```

### Mitigations, in order of speed

```bash
ssh prod '/srv/app/deploy.sh <previous-sha>'                    # roll back
aws ecs update-service --cluster production --service orders-api --task-definition orders-api:41
ssh prod 'docker compose restart api'                           # buys time
ssh prod 'docker compose up -d --scale worker=0 worker'         # shed background load
# turn off the feature flag for the failing dependency
```
