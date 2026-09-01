### Caching a proxied response

```nginx
proxy_cache_path /var/cache/nginx keys_zone=api:20m inactive=10m;

location /api/v1/public/ {
  proxy_cache api;
  proxy_cache_valid 200 60s;
  proxy_cache_use_stale error timeout updating;
  add_header X-Cache-Status $upstream_cache_status;
}
```

- **`use_stale updating` serves the old copy while one request refreshes it**, which prevents a stampede when a hot key expires
