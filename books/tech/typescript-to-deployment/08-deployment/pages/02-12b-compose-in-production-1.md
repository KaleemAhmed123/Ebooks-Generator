## Compose in production

- Compose is a development tool that happens to work in production. **On a single VPS it is a completely reasonable answer**, and Module 3 uses it that way
- It stops being reasonable the moment you need more than one machine

```yaml
services:
  api:
    image: registry.example.com/orders-api:${TAG:?TAG is required}
    restart: unless-stopped
    env_file: [/etc/app.env]
    ports: ["127.0.0.1:3000:3000"]
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1))"]
      interval: 30s
      timeout: 3s
      start_period: 20s
    stop_grace_period: 45s
    deploy:
      resources:
        limits: { cpus: '1.0', memory: 512M }
    logging:
      driver: json-file
      options: { max-size: '20m', max-file: '5' }
```

| Setting | Why it is not optional |
|---|---|
| `image:` with a **tag**, not `build:` | production runs a tested artifact, not a local build |
| `restart: unless-stopped` | survives a crash and a reboot |
| `stop_grace_period` | longer than your slowest request |
| **`logging` limits** | without them, `json-file` fills the disk. This is the most common single-box outage |
| resource limits | one container cannot take the machine down |
