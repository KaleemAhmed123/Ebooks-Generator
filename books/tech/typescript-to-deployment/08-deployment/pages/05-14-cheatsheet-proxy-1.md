## Cheatsheet: proxy configuration

### The block that must be right, in all three

```nginx
# Nginx
location / {
  proxy_pass http://app;
  proxy_http_version 1.1;
  proxy_set_header Host              $host;
  proxy_set_header X-Real-IP         $remote_addr;
  proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_read_timeout 60s;
}
```

```text
# Caddy: all of the above is the default
reverse_proxy api:3000
```

```yaml
# Traefik: also the default
- traefik.http.services.api.loadbalancer.server.port=3000
```

### Streaming, which breaks by default everywhere

```nginx
proxy_buffering off;  gzip off;  proxy_read_timeout 3600s;
```

```text
reverse_proxy api:3000 { flush_interval -1 }
```

### WebSockets

```nginx
map $http_upgrade $connection_upgrade { default upgrade; '' close; }
proxy_set_header Upgrade    $http_upgrade;
proxy_set_header Connection $connection_upgrade;
proxy_read_timeout 3600s;
```

- Caddy and Traefik handle the upgrade automatically. **Only the timeout needs raising**
