## Secrets Manager

- Parameter Store stores a value. **Secrets Manager stores a credential and can rotate it**, which is the whole difference
- It costs about forty cents per secret per month, which is nothing next to a leaked database password

```bash
aws secretsmanager create-secret --name prod/orders/db \
  --secret-string '{"username":"app","password":"...","host":"orders.abc.rds.amazonaws.com","port":5432}'

aws secretsmanager get-secret-value --secret-id prod/orders/db \
  --query SecretString --output text | jq -r .password

aws secretsmanager rotate-secret --secret-id prod/orders/db \
  --rotation-lambda-arn <arn> --rotation-rules AutomaticallyAfterDays=30

aws secretsmanager list-secrets --query 'SecretList[].[Name,LastRotatedDate]' --output table
```

### Rotation, and the part that matters

- Rotation moves through four steps: create a new version, set it on the database, test it, then mark it current
- **Two passwords are valid during the window**, which is what lets running applications keep working through a rotation
- **For RDS, `--manage-master-user-password` sets all of this up for you** and is the easiest correct answer
