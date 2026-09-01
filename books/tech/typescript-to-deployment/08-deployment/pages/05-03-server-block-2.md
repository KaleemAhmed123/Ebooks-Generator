### How `location` is chosen

| Form | Means | Priority |
|---|---|---|
| `location = /health` | exact match | highest |
| `location ^~ /assets/` | prefix, stop searching | second |
| `location ~ \.php$` | regular expression, case sensitive | third, in file order |
| `location /api/` | ordinary prefix | lowest, longest wins |

### The trailing slash rule

```nginx
location /api/ { proxy_pass http://app; }      # /api/orders -> /api/orders
location /api/ { proxy_pass http://app/; }     # /api/orders -> /orders
```

- **A trailing slash on `proxy_pass` strips the matched prefix.** This one character causes more 404s than anything else in Nginx
- `keepalive 32` with `proxy_http_version 1.1` reuses upstream connections, which removes a TCP handshake from every request
