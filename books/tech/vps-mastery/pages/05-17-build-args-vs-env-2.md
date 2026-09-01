### Never pass a secret as a build argument

```dockerfile
ARG NPM_TOKEN          # visible in docker history, forever
```

```bash
docker history marketplace/orders:7f3a91c --no-trunc | grep NPM_TOKEN
```

- Use a build secret instead. It is mounted for one instruction and never written to a layer:

```dockerfile
RUN --mount=type=secret,id=npmtoken \
    NPM_TOKEN=$(cat /run/secrets/npmtoken) npm ci
```

```bash
docker build --secret id=npmtoken,env=NPM_TOKEN .
```
