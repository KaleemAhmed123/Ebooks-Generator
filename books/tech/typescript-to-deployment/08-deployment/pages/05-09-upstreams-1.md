## Upstreams and load balancing

- One Node process uses one core. A machine with four cores wants four processes, and Nginx spreads traffic across them
- This is the same job an ALB does across instances. Nginx does it across processes on one machine

```nginx
upstream app {
  least_conn;
  server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;
  server 127.0.0.1:3001 max_fails=3 fail_timeout=30s;
  server 127.0.0.1:3002 max_fails=3 fail_timeout=30s;
  server 127.0.0.1:3003 backup;
  keepalive 64;
}
```

| Method | Sends the request to |
|---|---|
| round robin | the next one, in order. The default |
| `least_conn` | the one with fewest active connections |
| `ip_hash` | always the same backend for an address |
| `hash $request_uri` | the same backend for the same path |

- **`least_conn` is the better default for an API** where request durations vary. Round robin sends a slow request to a busy worker as readily as an idle one
- **`ip_hash` is a sign of a design problem.** It exists for in-memory sessions, and the fix is to move sessions to Redis, as Booklet 5 covers
