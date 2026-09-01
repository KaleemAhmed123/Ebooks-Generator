## Not running as root inside the container

- By default a container process runs as root. Container root is not host root, but it is one kernel bug away from it
- A compromised process running as root inside the image can write anywhere in that filesystem, install packages, and read every mounted volume

### The official Node images already provide an account

```dockerfile
USER node
```

- `node` is uid 1000, created in the base image. Nothing else to do

### Creating one explicitly

```dockerfile
RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app
USER app
```

### Order matters

- `USER` applies to every instruction after it. Anything needing root, such as `apk add`, must come first

```dockerfile
RUN apk add --no-cache tini      # as root
COPY --from=build /app/dist ./dist
RUN chown -R node:node /app      # hand ownership over
USER node                        # everything after this is unprivileged
CMD ["node", "dist/main.js"]
```

### Ports below 1024

- An unprivileged process cannot bind port 80. It does not need to. Containers listen on 3000 or 8080, and Nginx owns 80 and 443 on the host

### The volume permission problem

- A named volume mounted into a container is created owned by root on first use. A process running as uid 1001 then cannot write to it
- Fix by setting ownership in the Dockerfile before `USER`, or by matching the numeric ID as page 03-06 describes
