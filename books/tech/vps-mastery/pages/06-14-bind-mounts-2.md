### The trap: a bind mount over a directory hides it

- Mounting a host directory onto a container path **replaces** the contents. If the host directory is empty, the container path is now empty

```yaml
volumes:
  - ./config:/app/config     # if ./config is empty, /app/config is now empty
```

- The image shipped defaults in `/app/config`. They are gone, and the application starts with nothing. This produces "worked in the image, broken in Compose"

### Mounting the Docker socket

```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock:ro
```

- Needed by monitoring agents. **It grants that container full control of the host**, including starting privileged containers. `:ro` does not meaningfully reduce that. Mount it only into images you trust completely
