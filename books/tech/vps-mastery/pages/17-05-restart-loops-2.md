### Get inside an image that will not stay up

```bash
docker run --rm -it --entrypoint sh ghcr.io/kaleem/orders:7f3a91c
ls -la /app
node -e "console.log(process.version)"
```

### The four usual causes

1. A missing environment variable, and the process exits on the check from page 11-02
2. A dependency not ready, and no retry. Page 06-08
3. A health check with too short a `start_period`, so a healthy service is killed while warming up
4. A file the container cannot read, because of the volume ownership problem on page 03-06
