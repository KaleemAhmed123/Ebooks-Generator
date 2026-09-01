## Traefik

- Nginx and Caddy read a file. **Traefik watches Docker and configures itself from container labels**, so a new service is routed the moment it starts
- That is the reason to choose it: **no proxy config to edit when the stack changes**

```yaml
  traefik:
    image: traefik:v3
    restart: unless-stopped
    command:
      - --providers.docker=true
      - --providers.docker.exposedByDefault=false
      - --entryPoints.web.address=:80
      - --entryPoints.web.http.redirections.entryPoint.to=websecure
      - --entryPoints.websecure.address=:443
      - --certificatesResolvers.le.acme.email=ops@example.com
      - --certificatesResolvers.le.acme.storage=/letsencrypt/acme.json
      - --certificatesResolvers.le.acme.httpChallenge.entryPoint=web
      - --accesslog=true
      - --metrics.prometheus=true
    ports: ["80:80", "443:443"]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/letsencrypt:/letsencrypt

  api:
    image: ghcr.io/acme/orders-api:${TAG:?}
    labels:
      - traefik.enable=true
      - traefik.http.routers.api.rule=Host(`api.example.com`)
      - traefik.http.routers.api.entrypoints=websecure
      - traefik.http.routers.api.tls.certresolver=le
      - traefik.http.services.api.loadbalancer.server.port=3000
      - traefik.http.middlewares.rl.ratelimit.average=100
      - traefik.http.routers.api.middlewares=rl
```
