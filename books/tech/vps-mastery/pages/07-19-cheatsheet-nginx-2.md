### Directives worth memorizing

| Need | Directive |
|---|---|
| Bigger uploads | `client_max_body_size 50M;` |
| WebSockets | `proxy_set_header Upgrade $http_upgrade;` |
| Streamed responses | `proxy_buffering off;` |
| Long endpoint | `proxy_read_timeout 300s;` |
| Redirect to HTTPS | `return 301 https://$host$request_uri;` |
| Drop unknown hosts | `return 444;` |
| Serve a health check without a backend | `location = /healthz { return 200 "ok\n"; }` |
