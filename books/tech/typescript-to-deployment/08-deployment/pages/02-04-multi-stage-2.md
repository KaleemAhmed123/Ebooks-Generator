### Building one stage

```bash
docker build --target build -t myapp:build .
```

- Useful for a CI stage that runs tests inside the same environment the image was built in

### Caching the package manager between builds

```dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
```

- The cache directory persists across builds without becoming a layer, which speeds up a cold CI runner
