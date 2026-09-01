## Making both colors addressable

- Both projects define a service called `orders`. Nginx is on a network where both are present, so the name is ambiguous
- The fix is a **network alias** carrying the color

```yaml
# app/docker-compose.yml, started twice with COLOR=blue and COLOR=green
services:
  api-gateway:
    image: ghcr.io/kaleem/api-gateway:${IMAGE_TAG}
    env_file: [../.env]
    networks:
      edge:
        aliases: ["api-gateway-${COLOR}"]
      data:
    restart: unless-stopped

  orders:
    image: ghcr.io/kaleem/orders:${IMAGE_TAG}
    env_file: [../.env]
    networks:
      edge:
        aliases: ["orders-${COLOR}"]
      data:
    restart: unless-stopped

networks:
  edge: { name: app_edge, external: true }
  data: { name: app_data, external: true }
```
