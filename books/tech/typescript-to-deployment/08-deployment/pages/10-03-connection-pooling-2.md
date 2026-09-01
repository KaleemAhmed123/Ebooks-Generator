### RDS Proxy

```bash
aws rds create-db-proxy --db-proxy-name orders-proxy \
  --engine-family POSTGRESQL \
  --auth 'SecretArn=arn:aws:secretsmanager:...,IAMAuth=REQUIRED' \
  --role-arn arn:aws:iam::123456789012:role/rds-proxy \
  --vpc-subnet-ids subnet-a subnet-b
```

- The proxy holds a pool to the database and multiplexes many client connections onto it
- **It is close to mandatory with Lambda**, where concurrency and connection count are the same number
- It also survives a failover more gracefully, holding client connections while the database switches
- **PgBouncer is the self-hosted equivalent**, and in transaction pooling mode it does not support session-level features such as prepared statements without care

### The rule

- **Set a `pool_timeout` and a statement timeout.** Without them, a pool exhaustion presents as every request hanging rather than as a clear error
