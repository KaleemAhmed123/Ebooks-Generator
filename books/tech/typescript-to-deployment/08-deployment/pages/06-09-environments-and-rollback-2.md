### Rolling back

```bash
# ECS: redeploy the previous revision. Seconds, not a rebuild
aws ecs update-service --cluster production --service orders-api \
  --task-definition orders-api:41

# EC2: run the previous image tag
docker run -d --name api ... 123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:<previous-sha>
```

- **A rollback is deploying an artifact that already exists.** Reverting a commit and rebuilding takes ten minutes you do not have during an incident
- **Practice it.** A rollback path that has never been used is not a rollback path
- **A database migration is the exception.** It usually cannot be rolled back, which is why Module 12 covers making migrations backward compatible
