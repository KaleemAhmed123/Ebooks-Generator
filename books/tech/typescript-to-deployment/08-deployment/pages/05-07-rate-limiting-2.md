## Rate limiting at the edge - continued

| Setting | Means |
|---|---|
| `rate=20r/s` | the sustained rate, enforced as one request per 50ms |
| `burst=40` | how many may queue above the rate |
| `nodelay` | serve the burst immediately rather than spacing it out |
| `limit_conn 20` | concurrent connections per address, which is what stops a slow-read attack |
| `limit_req_status 429` | the default is `503`, which is wrong and confuses clients |

- **Without `burst`, a normal page loading twelve assets at once is rate limited.** Almost every complaint about Nginx rate limiting is a missing burst
- **`$binary_remote_addr` behind a proxy is the proxy.** Behind an ALB, use `$http_x_forwarded_for` with `real_ip` configured, or every client shares one bucket

```nginx
set_real_ip_from 10.0.0.0/16;
real_ip_header X-Forwarded-For;
real_ip_recursive on;
```
