### Operations

```bash
nginx -t && systemctl reload nginx
nginx -T | less                                  # the fully merged config
caddy validate --config /etc/caddy/Caddyfile
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
docker compose logs -f traefik | grep -i error

curl -sI https://api.example.com | head
curl -svo /dev/null https://api.example.com 2>&1 | grep -E '^[<>]'
echo | openssl s_client -connect api.example.com:443 2>/dev/null | openssl x509 -noout -dates
```
