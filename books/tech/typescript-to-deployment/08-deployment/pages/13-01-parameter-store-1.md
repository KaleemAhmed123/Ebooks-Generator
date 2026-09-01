# Module 13 - Configuration and secrets

## Parameter Store

- Configuration has to come from somewhere that is not the image and not the repository. **Parameter Store is the simple answer, and it is free for standard parameters**

```bash
aws ssm put-parameter --name /prod/orders/LOG_LEVEL --value info --type String --overwrite
aws ssm put-parameter --name /prod/orders/DATABASE_URL --value 'postgres://...' --type SecureString --overwrite

aws ssm get-parameters-by-path --path /prod/orders/ --recursive --with-decryption \
  --query 'Parameters[].[Name,Value]' --output text

aws ssm get-parameter --name /prod/orders/LOG_LEVEL --query Parameter.Value --output text
aws ssm get-parameter-history --name /prod/orders/LOG_LEVEL --query 'Parameters[].[Version,LastModifiedDate]'
```

### The hierarchy is the design

```text
/prod/orders/DATABASE_URL
/staging/orders/DATABASE_URL
/prod/shared/REDIS_URL
```

- **An IAM policy can grant `/prod/orders/*` and nothing else**, which is how one service is prevented from reading another's configuration
- Fetching by path in one call is what makes the bootstrap script on the EC2 page a single request
