### Useful additions

```text
api.example.com {
	reverse_proxy api:3000 {
		health_uri /health
		health_interval 10s
	}
	@stream path /api/v1/stream*
	reverse_proxy @stream api:3000 {
		flush_interval -1          # required for SSE, same as proxy_buffering off
	}
}
```

```bash
docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

- **`flush_interval -1` is Caddy's version of `proxy_buffering off`**, and without it streaming silently stops working in production
