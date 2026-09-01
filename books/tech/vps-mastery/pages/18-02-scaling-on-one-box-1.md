## Scaling on one box

- Two directions, and the cheap one comes first

### Vertical: a bigger box

- Resize in the provider panel, reboot, done. Ten minutes
- **Try this first.** A 4 GB box costs roughly twice a 2 GB box, and doubling the machine is cheaper than an afternoon of engineering

### Horizontal: more replicas

```bash
docker compose up -d --scale orders=3
```

- Compose starts three containers. **This only helps if the service is stateless.** Anything holding state in memory now holds three different states

### Requirements before scaling out

| Requirement | Why |
|---|---|
| Sessions in Redis | Otherwise a user is logged in on one replica only |
| No local file writes | Uploads must go to object storage |
| Broker for socket fan-out | Page 10-09 |
| Scheduled jobs run once | A lock, or a single designated instance |
| Database connections budgeted | Three replicas is three times the pool |
