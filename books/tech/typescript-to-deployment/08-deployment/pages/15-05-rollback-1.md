## Rolling back

- **A rollback is redeploying an artifact that already exists.** It takes seconds, and it is always the first move when a deploy is suspected

```bash
# VPS
ssh prod '/srv/app/deploy.sh <previous-sha>'

# ECS: the previous task definition revision
aws ecs update-service --cluster production --service orders-api \
  --task-definition orders-api:41
aws ecs wait services-stable --cluster production --services orders-api

# ALB blue/green: move the listener back
aws elbv2 modify-listener --listener-arn <arn> \
  --default-actions Type=forward,TargetGroupArn=<blue-tg>
```

### The decision, stated once

- **If a deploy is a plausible cause, roll back first and investigate second.** The debate about whether it is definitely the cause costs more than the rollback
- **Reverting a commit and rebuilding is not a rollback.** That is ten minutes of pipeline you do not have
