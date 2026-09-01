### The error log is where the reason lives

```text
connect() failed (111: Connection refused) while connecting to upstream,
upstream: "http://127.0.0.1:8080/orders", host: "api.example.com"
```

- The access log records a 502. The error log says the backend refused the connection. Both are needed

### Rotation

- Ubuntu rotates these daily and keeps 14 days, through `/etc/logrotate.d/nginx`. It sends `USR1` so Nginx reopens the files without dropping connections
