### There is no shell

```bash
docker run -it --rm --pid container:api --network container:api \
  --cap-add SYS_PTRACE nicolaka/netshoot
```

- **A debug container joins the target's namespaces** and brings its own tools, which is how you debug a distroless image with no shell
- `docker debug` does the same on newer versions

### The build failed

```bash
docker build --progress=plain --no-cache .      # full output, nothing hidden
docker build --target build -t tmp . && docker run -it tmp sh   # inspect a stage
```
