### The commands used most

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <acct>.dkr.ecr.ap-south-1.amazonaws.com
aws ecs update-service --cluster production --service orders-api --force-new-deployment
aws logs tail /ecs/orders-api --follow --since 15m
aws ssm start-session --target i-0abc123
aws secretsmanager get-secret-value --secret-id prod/orders/db --query SecretString --output text
aws s3 cp ./dist s3://acme-assets/ --recursive --cache-control 'public,max-age=31536000,immutable'
aws s3 sync ./public s3://acme-assets/ --delete
aws rds describe-db-instances --query 'DBInstances[].{Id:DBInstanceIdentifier,Status:DBInstanceStatus}'
```

### Waiting instead of polling

```bash
aws ecs wait services-stable --cluster production --services orders-api
aws cloudformation wait stack-update-complete --stack-name orders
```

- **`aws ... wait` blocks until the state is reached**, which is what a deploy script should do rather than sleeping
