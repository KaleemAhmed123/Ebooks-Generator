## Volumes

- A container's writable layer disappears when the container is removed. **Every deploy removes containers.** Anything that must survive goes on a volume

```yaml
services:
  postgres:
    image: postgres:18-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

- Compose creates `app_pgdata` on first use. `docker compose down` leaves it alone. `docker compose down -v` deletes it

### What belongs on a volume

| Data | Volume |
|---|---|
| Database files | Yes |
| Uploaded files served back to users | Yes |
| Redis dump, if persistence is wanted | Yes |
| Application logs | No. Write to stdout, page 15-08 |
| Build output | No. It belongs in the image |
| Session state | No. Put it in Redis so any replica can read it |
