## The headers a proxy must set

- Behind a proxy, Node sees a connection from `127.0.0.1` on plain HTTP. The real client address, protocol and hostname are lost unless the proxy passes them
- **Everything that depends on the client address breaks silently**: rate limiting, audit logs, geolocation, and secure cookie handling

```nginx
location / {
  proxy_pass http://app;
  proxy_http_version 1.1;

  proxy_set_header Host              $host;
  proxy_set_header X-Real-IP         $remote_addr;
  proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-Host  $host;
  proxy_set_header X-Request-Id      $request_id;

  proxy_connect_timeout 5s;
  proxy_send_timeout    60s;
  proxy_read_timeout    60s;
}
```

| Header | Carries |
|---|---|
| `Host` | the name the client asked for, needed for virtual hosts and redirects |
| `X-Real-IP` | the immediate client address |
| `X-Forwarded-For` | the whole chain, appended by each proxy |
| `X-Forwarded-Proto` | `https`, so the app knows the original scheme |
| `X-Request-Id` | Nginx generates one, giving correlation from the edge |
