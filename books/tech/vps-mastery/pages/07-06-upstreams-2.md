### Health and failover across several backends

```nginx
upstream api_gateway {
    server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:8081 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:8082 backup;
}
```

| Setting | Effect |
|---|---|
| `max_fails=3` | Three failures inside `fail_timeout` marks it down |
| `fail_timeout=30s` | Both the window and how long it stays down |
| `backup` | Used only when every other server is down |

- Open source Nginx has passive health checks only. It learns a backend is down by failing a real request
