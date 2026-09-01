## Cheatsheet: building images

```bash
docker build -t app:1.4.2 .
docker build -t app:1.4.2 -f apps/api/Dockerfile .
docker build --target build -t app:build .          # one stage
docker build --no-cache -t app:1.4.2 .
docker build --progress=plain .                     # full log, for debugging
docker build --build-arg NODE_VERSION=24 .
docker build --secret id=npmrc,src=$HOME/.npmrc .
docker build --pull .                               # refresh the base image
```

### buildx

```bash
docker buildx ls
docker buildx create --name multi --driver docker-container --use
docker buildx build --platform linux/amd64,linux/arm64 -t repo/app:1.4.2 --push .
docker buildx build --cache-from type=gha --cache-to type=gha,mode=max .
docker buildx bake --push
docker buildx imagetools inspect repo/app:1.4.2
docker buildx prune -f
```
