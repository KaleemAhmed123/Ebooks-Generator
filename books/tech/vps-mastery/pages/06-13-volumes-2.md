### Where they live

```bash
docker volume ls
docker volume inspect app_pgdata --format '{{.Mountpoint}}'
# /var/lib/docker/volumes/app_pgdata/_data
```

### The command that destroys production

```bash
docker compose down -v          # deletes every volume in this project
```

- There is no confirmation and no undo. The only protection is the backup from Module 12
- `docker system prune --volumes` does the same thing across every project on the box
