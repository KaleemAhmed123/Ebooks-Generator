## .dockerignore, and the architecture trap

### .dockerignore

- Everything in the build directory is sent to the builder before the first instruction runs. A local `node_modules` makes that gigabytes

```text
node_modules
.git
.env
.env.*
dist
.next
coverage
*.log
Dockerfile
docker-compose*.yml
```

- Copying a host `node_modules` into the image is worse than slow. It brings binaries compiled for the wrong platform, and they fail at run time with an unhelpful message

```bash
docker build . 2>&1 | head -1
# => transferring context: 1.2GB      <- missing .dockerignore
# => transferring context: 412kB      <- correct
```
