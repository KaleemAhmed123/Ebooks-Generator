## Volumes are the only thing that survives

- Everything else on the box is reproducible. Code comes from Git, images come from a registry, packages come from apt
- **The volumes are not reproducible.** They are the only irreplaceable thing on the machine

```bash
docker volume ls
# app_pgdata
# app_mongodata
# app_redisdata
# app_rabbitdata
# app_miniodata
```

### The four things that must exist off the box

| Item | Where it lives | Loss means |
|---|---|---|
| Database contents | `app_pgdata` | The business |
| Uploaded files | `app_miniodata` | User content, unrecoverable |
| `.env` | `/srv/app/.env` | Nothing starts |
| TLS certificates | `/etc/letsencrypt` | Re-issue. Recoverable in minutes |

- Only the first two are genuinely irreplaceable. The last two are inconvenient, and page 11-04 already solved `.env`

### What does not need backing up

- Redis, if it is a cache. Rebuilding it is the point of a cache
- RabbitMQ, if queues drain quickly. A backup of a queue restores stale work
- Anything under `/var/lib/docker/overlay2`. Those are images, and images come from the registry

### The sentence that matters

- **A backup that has never been restored is not a backup.** Page 12-07 makes restoring a scheduled exercise rather than a first attempt during an outage
