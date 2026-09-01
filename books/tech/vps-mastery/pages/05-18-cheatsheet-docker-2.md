### Cleaning

```bash
docker image prune -f                 # dangling images only. Safe
docker builder prune -f               # build cache
docker container prune -f             # stopped containers
docker system df                      # check before the next line
docker system prune -a                # every image not used by a RUNNING container
```

:::note
`docker system prune -a` removes images that stopped containers still reference. On a box with several projects it deletes the images the others need. Prefer the narrow commands above it.
:::
