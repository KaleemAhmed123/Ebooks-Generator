## Uptime Kuma first

```yaml
uptime-kuma:
  image: louislam/uptime-kuma:1
  volumes:
    - kuma:/app/data
  networks: [edge]
  restart: unless-stopped
```

```nginx
server {
    listen 443 ssl;
    server_name monitor.example.com;
    location / {
        proxy_pass http://uptime-kuma:3001;
        include /etc/nginx/snippets/proxy.conf;
        auth_basic "monitoring";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

### The monitors worth creating

| Monitor | Type | Interval |
|---|---|---|
| `https://example.com` | HTTP, expect 200 | 60 s |
| `https://api.example.com/healthz` | HTTP, keyword `ok` | 60 s |
| `https://api.example.com/readyz` | HTTP, expect 200 | 120 s |
| TLS certificate expiry | Built into the HTTP monitor | Daily |
| The nightly backup | Push monitor | 24 h |
