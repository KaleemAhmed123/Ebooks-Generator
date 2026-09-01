## The clean slate, scoped

- When containers will not stop and networks are tangled, the temptation is the blunt command. It is almost always too blunt

```bash
docker rm -f $(docker ps -aq)      # every container on the box, from every project
docker system prune -af            # every image not used by a running container
```

- On a box hosting more than one thing, that stops the other projects too. On any box, it deletes the previous image and with it the rollback

### Scope it to one project

```bash
docker compose -p app-green -f app/docker-compose.yml down --remove-orphans
docker compose -p app-green -f app/docker-compose.yml up -d --force-recreate
```

- `--force-recreate` rebuilds the containers from the same images. It clears a bad container state without touching images or volumes
