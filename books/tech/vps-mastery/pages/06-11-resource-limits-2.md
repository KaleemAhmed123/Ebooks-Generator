### Budgeting a 8 GB box

| Service group | Count | Each | Total |
|---|---|---|---|
| Backend services | 12 | 512M | 6.0 G |
| Frontends | 3 | 512M | 1.5 G |
| Postgres | 1 | 1G | 1.0 G |
| Redis | 1 | 256M | 0.25 G |
| RabbitMQ | 1 | 512M | 0.5 G |
| Nginx | 1 | 128M | 0.13 G |

- That totals more than 8 GB. Limits are ceilings, not reservations, so this works while services stay below their caps and fails when several peak together
- The honest reading: **12 services at 512M do not fit on 8 GB with room for a deploy.** Either raise the box or lower the caps

### Watching real usage before choosing

```bash
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}"
```

- Set the limit at roughly twice observed steady-state usage
