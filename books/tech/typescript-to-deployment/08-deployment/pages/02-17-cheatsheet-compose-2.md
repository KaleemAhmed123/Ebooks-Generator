### Cleanup, in increasing order of danger

```bash
docker system df                          # look first, always
docker container prune                    # stopped containers
docker image prune                        # dangling images only
docker builder prune                      # the build cache. Usually the biggest win
docker image prune -a --filter 'until=168h'   # images unused for a week
docker volume prune                       # volumes no container uses
docker system prune -a --volumes          # everything. Read it twice
```

- **`--volumes` deletes data.** On a machine running a database in a volume, that is the database

### Keeping a server tidy automatically

```bash
# /etc/cron.weekly/docker-prune
docker image prune -af --filter 'until=336h'
docker builder prune -af --filter 'until=168h'
```
