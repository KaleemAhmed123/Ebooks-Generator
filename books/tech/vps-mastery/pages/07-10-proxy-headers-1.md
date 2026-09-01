## The headers a proxy must set

- Once behind a proxy, the backend sees Nginx, not the user. Every request looks like it came from `127.0.0.1` over plain HTTP
- Put these in one snippet and include it everywhere

```bash
sudo nano /etc/nginx/snippets/proxy.conf
```

```nginx
proxy_http_version 1.1;
proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header Connection        "";
```

| Header | Without it |
|---|---|
| `Host` | The backend sees the upstream name. Redirects and cookies break |
| `X-Real-IP` | Every log line and rate limit sees one address |
| `X-Forwarded-For` | Same, and any existing chain is lost |
| `X-Forwarded-Proto` | The app thinks it is on HTTP. Secure cookies are dropped, redirect loops start |

```nginx
location / {
    proxy_pass http://shop_ui;
    include /etc/nginx/snippets/proxy.conf;
}
```
