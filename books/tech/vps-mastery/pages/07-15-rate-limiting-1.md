## Rate limiting

- Define a zone at `http` level, apply it in a location

```nginx
http {
    limit_req_zone $binary_remote_addr zone=api:10m  rate=10r/s;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=5r/m;
    limit_conn_zone $binary_remote_addr zone=conn:10m;
    limit_req_status 429;
}
```

| Part | Meaning |
|---|---|
| `$binary_remote_addr` | Client IP, stored compactly. 16 bytes rather than 60 |
| `zone=api:10m` | A named 10 MB shared table, roughly 160,000 addresses |
| `rate=10r/s` | Ten requests per second, smoothed to one every 100 ms |
| `limit_req_status 429` | Return 429, not the default 503. 503 tells crawlers to retry |

```nginx
location /api/ {
    limit_req zone=api burst=20 nodelay;
    limit_conn conn 20;
    proxy_pass http://api_gateway;
}

location /api/auth/login {
    limit_req zone=auth burst=3;
    proxy_pass http://api_gateway;
}
```

### burst and nodelay

- `burst=20` queues up to 20 excess requests instead of rejecting them
- `nodelay` serves that burst immediately rather than trickling it at the configured rate
- Without `nodelay`, a page loading 30 assets at once feels broken. **Use `burst` with `nodelay` for normal traffic and `burst` alone for login endpoints**, where slowing an attacker down is the point
