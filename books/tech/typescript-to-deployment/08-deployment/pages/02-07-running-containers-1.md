## Running a container

```bash
docker run -d \
  --name orders-api \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file /etc/app.env \
  --memory 512m --cpus 1 \
  --read-only --tmpfs /tmp \
  --health-cmd 'node -e "fetch(String.raw`http://localhost:3000/health`).then(r=>process.exit(r.ok?0:1))"' \
  --health-interval 30s \
  myapp:1.4.2
```

| Flag | Does |
|---|---|
| `-d` | detached, in the background |
| `-p 127.0.0.1:3000:3000` | host port to container port. **The IP prefix keeps it off the internet** |
| `--env-file` | environment variables from a file, not on the command line |
| `--restart unless-stopped` | comes back after a crash and after a reboot |
| `--memory`, `--cpus` | cgroup limits, so one container cannot starve the host |
| `--read-only` | the filesystem cannot be modified at runtime |
| `--rm` | delete the container when it exits, for one-off runs |
