### Promoting

```bash
docker buildx imagetools inspect repo/app:$SHA --format '{{json .Manifest.Digest}}'
gh workflow run promote.yml -f sha=$SHA
gh run watch

# rollback
ssh prod '/srv/app/deploy.sh <previous-sha>'
aws ecs update-service --cluster production --service orders-api --task-definition orders-api:41
```
