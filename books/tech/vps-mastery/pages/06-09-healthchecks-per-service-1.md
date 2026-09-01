## Health checks for the common services

- Official images rarely ship a health check. Each one needs a command that proves the service is accepting work

### PostgreSQL

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres -d marketplace"]
  interval: 10s
  timeout: 3s
  retries: 5
  start_period: 15s
```

- Name the database. `pg_isready` with no `-d` succeeds while the target database is still being created on first boot

### MongoDB

```yaml
healthcheck:
  test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
  interval: 10s
  retries: 5
  start_period: 20s
```

### Redis

```yaml
healthcheck:
  test: ["CMD", "redis-cli", "ping"]
  interval: 10s
  retries: 5
```
