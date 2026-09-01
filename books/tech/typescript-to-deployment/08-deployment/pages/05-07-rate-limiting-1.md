## Rate limiting at the edge

- A limiter inside Node still costs a request, a JSON parse and a Redis round trip before it says no
- **Nginx rejects abuse before your process ever wakes up**, which is what keeps a service alive under a burst
- It complements, rather than replaces, the per-user limiter in the application. Nginx limits by address; the application limits by identity

```nginx
limit_req_zone  $binary_remote_addr zone=general:10m rate=20r/s;
limit_req_zone  $binary_remote_addr zone=login:10m   rate=5r/m;
limit_conn_zone $binary_remote_addr zone=conns:10m;
limit_req_status 429;

server {
  limit_conn conns 20;

  location / {
    limit_req zone=general burst=40 nodelay;
    proxy_pass http://app;
  }

  location = /api/v1/auth/login {
    limit_req zone=login burst=3;
    proxy_pass http://app;
  }
}
```
