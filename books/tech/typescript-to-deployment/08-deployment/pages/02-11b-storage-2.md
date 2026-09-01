### What actually fills a disk

```bash
docker system df                     # the summary
docker builder prune                 # the build cache, usually the largest
docker image prune -a
docker container prune
```

- **The build cache is the usual culprit on a CI machine**, and it grows without limit until something prunes it
